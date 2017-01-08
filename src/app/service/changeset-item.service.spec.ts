/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {Http, BaseRequestOptions} from "@angular/http";
import {ChangesetItemService} from "./changeset-item.service";
import {MockBackend} from "@angular/http/testing";
import {DeskService} from "./desk.service";
import {Employee} from "../model/employee";
import {Desk} from "../model/desk";
import {Changeset} from "../model/changeset";
import {ChangesetItem} from "../model/changeset-item";
import {DeskAssignmentService} from "./desk-assignment.service";
import {DeskAssignment} from "../model/desk-assignment";
import {MdSnackBar} from "@angular/material";

describe('changeset-item.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangesetItemService,{
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: MdSnackBar,
          useFactory: () => {
            return new MdSnackBar(null,null);
          }
        },
        MockBackend,BaseRequestOptions,
        DeskService,DeskAssignmentService]
    });
  });

  it('build ci with null', inject([ChangesetItemService], (service: ChangesetItemService) => {
    let ci = service.build(null,null,null)
    expect(ci).toBeNull()
  }));


  it('assign new emp to assigned desk: DA(M at 1) CI(Gun from null->1)', inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let changeset = new Changeset();

    //DA(M at 1)
    spyOn(daService,"getDeskAssignments").and.returnValue([buildDeskAssignment("M",1)])

    // CI(Gun from null->1)
    let gun = buildEmployee("Gun")
    let list:ChangesetItem[] = service.build(gun,buildDesk(1),changeset)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(2)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)

    expect(expectedNewCI.employee.firstname).toEqual("Gun")
    expect(expectedNewCI.fromDesk).toEqual(null)
    expect(expectedNewCI.toDesk.id).toEqual(1)

    let expectedExistingCI = list[1]
    expect(expectedExistingCI.changeset).toEqual(changeset)

    expect(expectedExistingCI.employee.firstname).toEqual("M")
    expect(expectedExistingCI.fromDesk.id).toEqual(1)
    expect(expectedExistingCI.toDesk).toEqual(null)
  }));

  it('assign existing emp to assigned desk: DA(M at 1) DA(Gun at 2) CI(Gun from null->1)', inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let changeset = new Changeset();

    //DA(M at 1) ,DA(Gun at 2)
    spyOn(daService,"getDeskAssignments").and.returnValue([buildDeskAssignment("M",1),buildDeskAssignment("Gun",2)])

    // CI(Gun from null->1)
    let gun = buildEmployee("Gun")
    let list:ChangesetItem[] = service.build(gun,buildDesk(1),changeset)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(2)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)

    expect(expectedNewCI.employee.firstname).toEqual("Gun")
    expect(expectedNewCI.fromDesk.id).toEqual(2)
    expect(expectedNewCI.toDesk.id).toEqual(1)

    let expectedExistingCI = list[1]
    expect(expectedExistingCI.changeset).toEqual(changeset)

    expect(expectedExistingCI.employee.firstname).toEqual("M")
    expect(expectedExistingCI.fromDesk.id).toEqual(1)
    expect(expectedExistingCI.toDesk).toEqual(null)
  }));

  it('assign existing emp to assigned desk that has another changesetItem: DA(M at 1) DA(Gun at 2) CI(Gun from 2->1) CI(V from null->1)', inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let changeset = new Changeset();

    //DA(M at 1) ,DA(Gun at 2)
    spyOn(daService,"getDeskAssignments").and.returnValue([buildDeskAssignment("M",1),buildDeskAssignment("Gun",2)])
    // CI(Gun from 2->1)
    spyOn(service,"getChangesetItems").and.returnValue([buildItem(buildDesk(2),buildDesk(1),changeset,buildEmployee("Gun"))])

    // CI(V from null->1)
    let v = buildEmployee("V")
    let list:ChangesetItem[] = service.build(v,buildDesk(1),changeset)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(2)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)

    expect(expectedNewCI.employee.firstname).toEqual("V")
    expect(expectedNewCI.fromDesk).toEqual(null)
    expect(expectedNewCI.toDesk.id).toEqual(1)

    let expectedExistingCI = list[1]
    expect(expectedExistingCI.changeset).toEqual(changeset)

    expect(expectedExistingCI.employee.firstname).toEqual("Gun")
    expect(expectedExistingCI.fromDesk.id).toEqual(2)
    expect(expectedExistingCI.toDesk).toEqual(null)
  }));

  it('unassign CI(1->null)', inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let changeset = new Changeset();

    //DA(M at 1) ,DA(Gun at 2)
    spyOn(daService,"getDeskAssignments").and.returnValue([buildDeskAssignment("M",1)])
    spyOn(service,"getChangesetItems").and.returnValue([])

    // CI(V from null->1)
    let m = buildEmployee("M")
    let list:ChangesetItem[] = service.build(m,null,changeset)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(1)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)

    expect(expectedNewCI.employee.firstname).toEqual("M")
    expect(expectedNewCI.fromDesk.id).toEqual(1)
    expect(expectedNewCI.toDesk).toEqual(null)

  }));

  it('move existing changesetItem DA(M at 1) -> CI(M from 1>2) -> CI(M from 1>3)', inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let changeset = new Changeset();

    //DA(M at 1)
    spyOn(daService,"getDeskAssignments").and.returnValue([buildDeskAssignment("M",1)])
    //CI(M from 1>2)
    spyOn(service,"getChangesetItems").and.returnValue([buildItem(buildDesk(1),buildDesk(2),changeset,buildEmployee("M"))])

    // CI(M from null->3)
    let m = buildEmployee("M")
    let list:ChangesetItem[] = service.build(m,buildDesk(3),changeset)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(1)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)

    expect(expectedNewCI.employee.firstname).toEqual("M")
    expect(expectedNewCI.fromDesk.id).toEqual(1)
    expect(expectedNewCI.toDesk.id).toEqual(3)
  }));


  it('Move CI to assiged desk should create new CI for existing DA', inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let changeset = new Changeset();

    //DA(M at 1)
    spyOn(daService,"getDeskAssignments").and.returnValue([buildDeskAssignment("M",1)])
    spyOn(service,"getChangesetItems").and.returnValue([])

    // CI(Gun from null->1)
    let gun = buildEmployee("Gun")
    let list:ChangesetItem[] = service.build(gun,buildDesk(1),changeset)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(2)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)

    expect(expectedNewCI.employee.firstname).toEqual("Gun")
    expect(expectedNewCI.fromDesk).toEqual(null)
    expect(expectedNewCI.toDesk.id).toEqual(1)

    let expectedExistingCI = list[1]
    expect(expectedExistingCI.changeset).toEqual(changeset)

    expect(expectedExistingCI.employee.firstname).toEqual("M")
    expect(expectedExistingCI.fromDesk.id).toEqual(1)
    expect(expectedExistingCI.toDesk).toEqual(null)
  }));

  it('Move CI to assiged desk which contains both CI and DA should create new CI for existing CI',  inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let changeset = new Changeset();

    //DA(M at 1)
    spyOn(daService,"getDeskAssignments").and.returnValue([buildDeskAssignment("M",1)])
    //CI(Gun from 2 > 1)
    spyOn(service,"getChangesetItems").and.returnValue([buildChangesetItem(changeset,2,1,"Gun")])

    // CI(V from null->1)
    let v = buildEmployee("V")
    let list:ChangesetItem[] = service.build(v,buildDesk(1),changeset)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(2)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)

    expect(expectedNewCI.employee.firstname).toEqual("V")
    expect(expectedNewCI.fromDesk).toEqual(null)
    expect(expectedNewCI.toDesk.id).toEqual(1)

    let expectedExistingCI = list[1]
    expect(expectedExistingCI.changeset).toEqual(changeset)

    expect(expectedExistingCI.employee.firstname).toEqual("Gun")
    expect(expectedExistingCI.fromDesk.id).toEqual(2)
    expect(expectedExistingCI.toDesk).toEqual(null)
  }));

  it('move to same desk',  inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let changeset = new Changeset();

    //DA(M at 1)
    spyOn(daService,"getDeskAssignments").and.returnValue([buildDeskAssignment("M",1)])
    //CI(M from 1 > 2)
    var item = buildChangesetItem(changeset,1,2,"M");
    item.id = 1
    spyOn(service,"getChangesetItems").and.returnValue([item])

    // CI(M from null->1)
    let m = buildEmployee("M")
    let list:ChangesetItem[] = service.build(m,buildDesk(1),changeset)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(1)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)
    expect(expectedNewCI.id).toEqual(1)

    expect(expectedNewCI.employee.firstname).toEqual("M")
    expect(expectedNewCI.fromDesk.id).toEqual(1)
    expect(expectedNewCI.toDesk.id).toEqual(1)
  }));

  it('when save CI if from or to equal to null remove it', inject([ChangesetItemService], (service: ChangesetItemService) => {
    spyOn(service, "remove");

    var changesetItem = new ChangesetItem();
    changesetItem.fromDesk = null
    changesetItem.toDesk = null
    service.saveItem(changesetItem)

    expect(service.remove).toHaveBeenCalled()
  }));

  it('when save CI if fromDesk equal to toDesk remove it', inject([ChangesetItemService], (service: ChangesetItemService) => {
    spyOn(service, "remove");

    var changesetItem = new ChangesetItem();
    changesetItem.fromDesk = buildDesk(1)
    changesetItem.toDesk = buildDesk(1)
    service.saveItem(changesetItem)

    expect(service.remove).toHaveBeenCalled()
  }));


  let buildDeskAssignment = function (name,deskCode) {
    let da = new DeskAssignment();
    da.employee = buildEmployee(name);
    da.desk = buildDesk(deskCode)
    return da;
  };

  let buildEmployee = function (name:string) {
    var employee = new Employee();
    employee.code = name
    employee.firstname = name
    return employee;
  };

  let buildDesk = function (id: number) {
    return Object.assign(new Desk(), {id: id, code: id});
  };

  let buildChangesetItem = function (changeset: Changeset,fromDesk,toDesk,name) {
    return buildItem(buildDesk(fromDesk), buildDesk(toDesk), changeset, buildEmployee(name));
  };

  let buildItem = function (fromDesk:Desk,toDesk:Desk,changeset:Changeset,employee:Employee) {
    var item = new ChangesetItem();
    item.changeset = changeset
    item.employee = employee

    item.fromDesk = fromDesk
    item.toDesk = toDesk
    return item;
  };
});

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
        MockBackend,BaseRequestOptions,
        DeskService,DeskAssignmentService]
    });
  });

  it('build ci with null', inject([ChangesetItemService], (service: ChangesetItemService) => {
    let ci = service.build(null,null,null,null,null)
    expect(ci).toBeNull()
  }));

  it('move to same desk', inject([ChangesetItemService], (service: ChangesetItemService) => {
    let employee = new Employee();
    let fromDesk = buildDesk(1)
    let toDesk = buildDesk(1)
    let previousChangesetItem = null
    let changeset = new Changeset();

    let ci = service.build(employee,fromDesk,toDesk,changeset,previousChangesetItem)
    expect(ci).toBeNull()
  }));

  it('unassign CI(1->null)', inject([ChangesetItemService], (service: ChangesetItemService) => {
    let employee = new Employee();
    let fromDesk = buildDesk(1)
    let toDesk = null
    let previousChangesetItem = null
    var changeset = new Changeset();

    let ci:ChangesetItem = service.build(employee,fromDesk,toDesk,changeset,previousChangesetItem)[0]
    expect(ci).not.toBeNull()

    expect(ci.changeset).toEqual(changeset)

    expect(ci.employee).toEqual(employee)
    expect(ci.fromDesk).toEqual(fromDesk)
    expect(ci.toDesk).toEqual(toDesk)
  }));

  it('assign to empty desk CI(null->1)', inject([ChangesetItemService], (service: ChangesetItemService) => {
    let employee = new Employee();
    let fromDesk = null
    let toDesk = buildDesk(1)
    let previousChangesetItem = null
    var changeset = new Changeset();

    let ci:ChangesetItem = service.build(employee,fromDesk,toDesk,changeset,previousChangesetItem)[0]
    expect(ci).not.toBeNull()

    expect(ci.changeset).toEqual(changeset)

    expect(ci.employee).toEqual(employee)
    expect(ci.fromDesk).toEqual(fromDesk)
    expect(ci.toDesk).toEqual(toDesk)
  }));

  it('assign new emp to assigned desk CI(null->1)', inject([ChangesetItemService], (service: ChangesetItemService) => {
    let employee = new Employee();
    let fromDesk = null
    let toDesk = buildDesk(1)
    let previousChangesetItem = null
    let changeset = new Changeset();

    let existingEmployee = new Employee();
    let existingCI = buildItem(buildDesk(5),buildDesk(1),changeset,existingEmployee);
    service.dataStore.changesetItems.push(existingCI)

    let list:ChangesetItem[] = service.build(employee,fromDesk,toDesk,changeset,previousChangesetItem)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(2)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)

    expect(expectedNewCI.employee).toEqual(employee)
    expect(expectedNewCI.fromDesk).toEqual(fromDesk)
    expect(expectedNewCI.toDesk).toEqual(toDesk)

    let expectedExistingCI = list[1]
    expect(expectedExistingCI.changeset).toEqual(changeset)

    expect(expectedExistingCI.employee).toEqual(existingEmployee)
    expect(expectedExistingCI.fromDesk.id).toEqual(5)
    expect(expectedExistingCI.toDesk).toEqual(null)
  }));

  it('move existing changesetItem DA(0) -> CI(0>1) -> CI(0>2)', inject([ChangesetItemService], (service: ChangesetItemService) => {
    let employee = new Employee();
    let fromDesk = buildDesk(1)
    let toDesk = buildDesk(2)
    let changeset = new Changeset();
    let previousChangesetItem = buildItem(buildDesk(0),buildDesk(1),changeset,employee)

    let ci:ChangesetItem = service.build(employee,fromDesk,toDesk,changeset,previousChangesetItem)[0]
    expect(ci).not.toBeNull()

    expect(ci.changeset).toEqual(changeset)

    expect(ci.employee).toEqual(employee)
    expect(ci.fromDesk.id).toEqual(0)
    expect(ci.toDesk.id).toEqual(2)
  }));

  it('Move CI to assiged desk should create new CI for existing DA', inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let employee = new Employee();
    let fromDesk = null
    let toDesk = buildDesk(1)
    let previousChangesetItem = null
    let changeset = new Changeset();

    let existingEmployee = new Employee();
    var da = new DeskAssignment();
    da.employee = existingEmployee
    da.desk = toDesk

    spyOn(daService,"findByDesk").and.returnValue([da])

    let list:ChangesetItem[] = service.build(employee,fromDesk,toDesk,changeset,previousChangesetItem)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(2)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)
    expect(expectedNewCI.employee).toEqual(employee)
    expect(expectedNewCI.fromDesk).toEqual(fromDesk)
    expect(expectedNewCI.toDesk).toEqual(toDesk)

    let expectedExistingCI = list[1]
    expect(expectedExistingCI.changeset).toEqual(changeset)
    expect(expectedExistingCI.employee).toEqual(existingEmployee)
    expect(expectedExistingCI.fromDesk.id).toEqual(da.desk.id)
    expect(expectedExistingCI.toDesk).toEqual(null)

  }));

  let buildEmployee = function (name:string) {
    var employee = new Employee();
    employee.firstname = name
    return employee;
  };

  it('Move CI to assiged desk which contains both CI and DA should create new CI for existing CI', inject([ChangesetItemService,DeskAssignmentService], (service: ChangesetItemService,daService:DeskAssignmentService) => {
    let employee = buildEmployee("M");
    let fromDesk = null
    let toDesk = buildDesk(1)
    let previousChangesetItem = null
    let changeset = new Changeset();

    // DA (V sit at 1)
    var da = new DeskAssignment();
    da.employee = buildEmployee("V");
    da.desk = toDesk
    spyOn(daService,"findByDesk").and.returnValue([da])

    // CI (Gun move from 5 to 1)
    let existingCI = buildItem(buildDesk(5),buildDesk(1),changeset,buildEmployee("Gun"));
    spyOn(service,"findByToDesk").and.returnValue([existingCI])

    // assign (M to 1)
    let list:ChangesetItem[] = service.build(employee,fromDesk,toDesk,changeset,previousChangesetItem)
    expect(list).not.toBeNull()
    expect(list.length).toEqual(2)

    let expectedNewCI = list[0]
    expect(expectedNewCI.changeset).toEqual(changeset)
    expect(expectedNewCI.employee.firstname).toEqual("M")
    expect(expectedNewCI.fromDesk).toEqual(null)
    expect(expectedNewCI.toDesk.id).toEqual(1)

    let expectedExistingCI = list[1]
    expect(expectedExistingCI.changeset).toEqual(changeset)
    expect(expectedExistingCI.employee.firstname).toEqual("Gun")
    expect(expectedExistingCI.fromDesk.id).toEqual(5)
    expect(expectedExistingCI.toDesk).toEqual(null)

  }));

  it('when save CI if from or to equal to null remove it', inject([ChangesetItemService], (service: ChangesetItemService) => {
    spyOn(service, "remove");

    var changesetItem = new ChangesetItem();
    changesetItem.fromDesk = null
    changesetItem.toDesk = null
    service.saveItem(changesetItem)

    expect(service.remove).toHaveBeenCalled()
  }));

  let buildDesk = function (id: number) {
    return Object.assign(new Desk(), {id: id, code: id});
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

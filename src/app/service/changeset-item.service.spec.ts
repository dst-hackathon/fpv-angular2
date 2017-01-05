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
        DeskService]
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

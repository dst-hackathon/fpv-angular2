import { FpvAngular2Page } from './app.po';

describe('fpv-angular2 App', function() {
  let page: FpvAngular2Page;

  beforeEach(() => {
    page = new FpvAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

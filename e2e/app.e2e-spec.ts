import { NewSrcPage } from './app.po';

describe('new-src App', () => {
  let page: NewSrcPage;

  beforeEach(() => {
    page = new NewSrcPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

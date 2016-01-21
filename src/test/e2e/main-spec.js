describe('savet7 homepage test', function() {
  it('should check initial text', function() {
    browser.get('https://pacific-gorge-58447.herokuapp.com/');

    element(by.css('.navbar-brand')getText()).toEqual('Savet7');
    // element(by.)

  });
});
Page({
  requestHttp() {
    my.httpRequest({
      url: 'http://localhost:14312',
      method: 'GET',
      data: {
        from: '支付宝',
        production: 'AlipayJSAPI',
      },
      dataType: 'json',
      success: function(res) {
        my.alert({content: JSON.stringify(res)});
      },
      fail: function(res) {
        my.alert({content: JSON.stringify(res)});
      },
      complete: function(res) {
        // my.alert({title: 'complete'});
      }
    });
  }
})

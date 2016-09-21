(function(module) {
  function Zip (opts) {
    for (var key in opts) {
      this[key] = opts[key];
    }
  };

  Zip.all = [];

  function createTable() {
    webDB.execute(
      'CREATE TABLE IF NOT EXIST zips( '+'id INTEGER PRIMARY KEY,'+ ' zip INTEGER,'+ 'neighborhood VARCHAR,'+ 'county VARCHAR'+');',
      function(){
        console.log('SUCCESSFULLY SETUP THE ARTICLE TABLE');
      }
    );
  };

  Zip.fetchAll = function() {
    createTable();
    $.getJSON('/data/manhattan.json', function(data) {
      data.features.map(function(bigDataSet) {
        return bigDataSet.properties;
      })
      .forEach(function(obj) {
        var aZipInstance = new Zip(obj);
        Zip.all.push(aZipInstance);
        aZipInstance.insertRecord();
      });
    });
  };

  Zip.prototype.insertRecord = function() {
    webDB.execute(
      [
        {
          'sql':'INSERT INTO zips(zip, neighborhood, county) VALUES(?,?,?);',
          'data': [this.zip, this.neighborhood, this.county]
        }
      ]
    );
  };

  module.Zip = Zip;
})(window);

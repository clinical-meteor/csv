## clinical:csv

Utilities for importing and exporting comma separated value (CSV) files.

[![testing](https://travis-ci.org/evaisse/meteor-csv.svg?branch=master)](https://travis-ci.org/evaisse/meteor-csv)


-----------------------------------
#### Package Installation  

```bash
meteor add clinical:csv
```


-----------------------------------
#### Simple Export (client)

```js
Template.fooPage.events({
  "click #downloadButton":function(){
    var csvContent = CSV.unparse(Posts.find().fetch());
    window.open('data:text/csv;charset=utf-8,' + escape(csvContent), '_self');
  }
});
```

-----------------------------------
#### Parsing/Unparsing CSV  

See the PapaParse documentation:
http://papaparse.com/

```js
// Parse CSV string
var data = CSV.parse(csv);

// Convert back to CSV
var csv = CSV.unparse(data);

// Parse local CSV file
CSV.parse(file, {
	complete: function(results) {
		console.log("Finished:", results.data);
	}
});

// Stream big file in worker thread
CSV.parse(bigFile, {
	worker: true,
	step: function(results) {
		console.log("Row:", results.data);
	}
});
```

-----------------------------------
#### Import CSV (Server)  


Given a CSV file like the following (simple.csv)

```csv
  1;01;ozan;OZAN;Ozan;O250;OSN;01190;284;01284;2;26;6;618;469;500;94;660;4.91667;46.3833;2866;51546;+45456;462330;170;205;14126;8823;26916
  2;01;marboz;MARBOZ;Marboz;M612;MRBS;01851;232;01232;2;11;6;2182;2164;2200;54;4014;5.25;46.3333;3246;51492;+51530;462033;194;240;4580;14287;1768
  3;01;foissiat;FOISSIAT;Foissiat;F230;FST;01340;163;01163;2;21;6;1912;1562;1900;47;4036;5.18333;46.3667;3153;51523;+51029;462213;186;228;5227;15952;1738
```

You can use server-side code synchronous to load the file line-by-line

```js
  CSV.readCsvFileLineByLine('simple.csv', function (line, index, rawParsedLine) {
      lines.push(line);
  });

  //lines[0][1] === "01";
```

If you want to insert in your collection, you need to wrap your insert, to make sure your code will be run synchronuously:

```javascript
  CSV.readCsvFileLineByLine('simple.csv', Meteor.bindEnvironment(function (line, index, rawParsedLine) {
    Collection.insert({
     property: line.property
    }));
  });
```

If you have more complex CSV files, with headers and escaping chars:

```csv
  "id":"firstName":"lastName"
  "1":"jimi":"hendrix"
  "2":"jim":"morrison"
```

You can simply add options to make it simple (refer to papa docs : http://papaparse.com/docs#config)

```js
    CSV.readCsvFileLineByLine(process.env.PWD + '/vicious.csv', {
        headers: true,
        delimiter: ":",
    }, function (line) {
        lines.push(line);
    });

    //lines[0].firstName === "foo";
    //lines[1].firstName === "jim";
```


-----------------------------------
#### Fetch CSV From Server  

Sometimes you'll want to fetch a CSV from a server-side collection.  Be careful with this, as Mongo collection can be large!

**Meteor Methods that Return CSV (server)**  

```JavaScript
Meteor.methods({
  download: function() {
    return CSV.unparse(CollectionToExtract.find().fetch());
  },
  customDownload: function(){
    var collectionData = CollectionToExtract.find().fetch();
    var heading = true; // Optional, defaults to true
    var delimiter = ";" // Optional, defaults to ",";
    return CSV.unparse(collectionData, heading, delimiter);    
  }
});
```

**Fetch CSV From Server and then Download (client)**

```JavaScript
//events
'click #buttonDownload': function(event) {
  var nameFile = 'fileDownloaded.csv';
  Meteor.call('download', function(err, fileContent) {
    if(fileContent){
      var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
      saveAs(blob, nameFile);
    }
  });
```

**Known issues**

- Documents need to have an identical length of elements.
- Objects are not displayed (export JSON instead).



-----------------------------------
#### Select File and Parse on Client  

```html
<template name="example">
  <div id="example>
    <button id="uploadCsv"></button>
    <input id="hiddenUpload" class="btn hidden" type="file" value="Hidden Upload">
  </div>
</template>
```
```js
Template.example.events({
  'click #uploadCsv': function(){
    $('#hiddenUpload').click();
  },
  'change #hiddenUpload': function(event, template){
    var filesList = event.currentTarget.files;
    if (filesList.length) {
      console.log('filesList', filesList);

      var file = filesList[0];
      console.log('file', file);

      if (file.type === 'text/csv') {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var jsonRepresentationOfCsv = CSV.parse(fileReader.result);
          console.log('jsonRepresentationOfCsv', jsonRepresentationOfCsv);
          Session.set('uploadedData', jsonRepresentationOfCsv);
        };
        fileReader.onerror = function (e) {
          throw 'Error reading CSV file';
        };

        fileReader.readAsText(file);
      }
    }
  }
})
```

-----------------------------------
#### Acknowledgements  

[https://github.com/mholt/PapaParse](https://github.com/mholt/PapaParse)   
[https://github.com/evaisse/meteor-csv](https://github.com/evaisse/meteor-csv)   
[https://github.com/lfergon/meteor-export-csv](https://github.com/lfergon/meteor-export-csv)   
[https://github.com/eligrey/FileSaver.js](https://github.com/eligrey/FileSaver.js)   

-----------------------------------
#### Licensing   

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

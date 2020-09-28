
Tinytest.add('test csv read se fibers to grab all lines in synchronous way', function (test) {

    if (Meteor.isClient) {
        return;
    }

    var lines = [],
        max = 0;


    CSV.readCsvFileLineByLine(process.env.PWD + '/./sample-data/test-4-rows.csv', function (line) {
        lines.push(line);
    });

    test.equal(lines.length, 4, "Should have 4 lines");

    lines.forEach(function (e) {
        test.isNotNull(e.forEach, 'test every element is an Array');
    });


});

Tinytest.add('test csv file is readed line by line', function (test) {

    if (Meteor.isClient) {
        return;
    }


    var lastLine,
        lastRowValue,
        linesCount = 0, 
        headers = [],
        values = [];


    lastRowValue = {
        ville_id: '35',
        ville_departement: '01',
        ville_slug: 'treffort-cuisiat',
        ville_nom: 'TREFFORT-CUISIAT',
        ville_nom_reel: 'Treffort-Cuisiat',
        ville_nom_soundex: 'T616323',
        ville_nom_metaphone: 'TRFRTKXT',
        ville_code_postal: '01370',
        ville_commune: '426',
        ville_code_commune: '01426',
        ville_arrondissement: '2',
        ville_canton: '33',
        ville_amdi: '5',
        ville_population_2010: '2204',
        ville_population_1999: '1908',
        ville_population_2012: '2100',
        ville_densite_2010: '56',
        ville_surface: '3941',
        ville_longitude_deg: '5.36834',
        ville_latitude_deg: '46.2714',
        ville_longitude_grd: '3369',
        ville_latitude_grd: '51413',
        ville_longitude_dms: '+52206',
        ville_latitude_dms: '461617',
        ville_zmin: '221',
        ville_zmax: '681',
        ville_population_2010_order_france: '4536',
        ville_densite_2010_order_france: '13892',
        ville_surface_order_france: '1853'
    };

    CSV.readCsvFileLineByLine(process.env.PWD + '/./sample-data/test-headers-35-rows.csv', { headers: true }, function (line) {
        lastLine = line;
        linesCount++;
    });

    test.equal(linesCount, 35);

    Object.keys(lastRowValue).forEach(function (k) {
        test.equal(lastLine[k], lastRowValue[k], "Last line match expected result");
    });



});



Tinytest.add('test customs delimiter and vicious formats', function (test) {

    var lastLine;

    if (Meteor.isClient) {
        return;
    }

    CSV.readCsvFileLineByLine(process.env.PWD + '/./sample-data/test-custom-delim.csv', { 
        headers: true,
        delimiter: ":",
    }, function (line) {
        lastLine = line;
    });

    test.equal(lastLine.firstName, "jim");
    test.equal(lastLine.lastName, "morrison");

});




Tinytest.add('test empty lines', function (test) {

    var lastLine, c = 0;

    if (Meteor.isClient) {
        return;
    }

    CSV.readCsvFileLineByLine(process.env.PWD + '/./sample-data/test-empty-lines-with-4-rows.csv', { 
        skipEmpty: true,
    }, function (line) {
        lastLine = line;
        c++;
    });

    test.equal(lastLine[2], "treffort-cuisiat");
    test.equal(c, 4);

});
describe('clinical:csv', function () {
  var server = meteor();
  var client = browser(server);

  it('Should exist on the client', function () {
    return client.execute(function () {
      expect(CSV).not.to.be.empty;
    });
  });

  it('Should exist on the server', function () {
    return server.execute(function () {
      expect(CSV).not.to.be.empty;
    });
  });

  it('CSV.parse() parses CSV to JSON on server', function () {
    return server.execute(function () {
      var csvData = "1;01;ozan;OZAN;Ozan;O250;OSN;01190;284;01284;2;26;6;618;469;500;94;660;4.91667;46.3833;2866;51546;+45456;462330;170;205;14126;8823;26916\n2;01;marboz;MARBOZ;Marboz;M612;MRBS;01851;232;01232;2;11;6;2182;2164;2200;54;4014;5.25;46.3333;3246;51492;+51530;462033;194;240;4580;14287;1768\n3;01;foissiat;FOISSIAT;Foissiat;F230;FST;01340;163;01163;2;21;6;1912;1562;1900;47;4036;5.18333;46.3667;3153;51523;+51029;462213;186;228;5227;15952;1738";
      var parsedData = CSV.parse(csvData);

      expect(CSV).not.to.be.empty;
      expect(parsedData.data[0][2]).to.equal('ozan')
      expect(parsedData.data[0][3]).to.equal('OZAN')
      expect(parsedData.data[0][4]).to.equal('Ozan')

      expect(parsedData.data[1][2]).to.equal('marboz')
      expect(parsedData.data[1][3]).to.equal('MARBOZ')
      expect(parsedData.data[1][5]).to.equal('M612')

      expect(parsedData.data[2][2]).to.equal('foissiat')
      expect(parsedData.data[2][5]).to.equal('F230')
      expect(parsedData.data[2][6]).to.equal('FST')

    });
  });
  it('CSV.parse() parses CSV to JSON on client', function () {
    return client.execute(function () {
      var csvData = "1;01;ozan;OZAN;Ozan;O250;OSN;01190;284;01284;2;26;6;618;469;500;94;660;4.91667;46.3833;2866;51546;+45456;462330;170;205;14126;8823;26916\n2;01;marboz;MARBOZ;Marboz;M612;MRBS;01851;232;01232;2;11;6;2182;2164;2200;54;4014;5.25;46.3333;3246;51492;+51530;462033;194;240;4580;14287;1768\n3;01;foissiat;FOISSIAT;Foissiat;F230;FST;01340;163;01163;2;21;6;1912;1562;1900;47;4036;5.18333;46.3667;3153;51523;+51029;462213;186;228;5227;15952;1738";
      var parsedData = CSV.parse(csvData);

      expect(CSV).not.to.be.empty;
      expect(parsedData.data[0][2]).to.equal('ozan')
      expect(parsedData.data[0][3]).to.equal('OZAN')
      expect(parsedData.data[0][4]).to.equal('Ozan')

      expect(parsedData.data[1][2]).to.equal('marboz')
      expect(parsedData.data[1][3]).to.equal('MARBOZ')
      expect(parsedData.data[1][5]).to.equal('M612')

      expect(parsedData.data[2][2]).to.equal('foissiat')
      expect(parsedData.data[2][5]).to.equal('F230')
      expect(parsedData.data[2][6]).to.equal('FST')
    });
  });
});

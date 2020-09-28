import { Papa } from 'papaparse';

CSV = Papa;

/**
 * Read a given filepath, for each line a fibers will 
 * 
 * @param  {String} filepath path to csv file
 * @param  {Function} linecallback a callback that will recieve every parsed lines
 * @param  {Object} config papaParse config object : http://papaparse.com/docs#config
 * @return {Object} an Array of fields if CSV file has no headers, or a Hash of key values if CSV file has header
 */

export function readCsvFileLineByLine(filepath, config, linecallback) {

    var readCsv,
        lineParser,
        rd, 
        lineCount = 0,
        cfg = {
            fileHasHeaders: false,
        },
        headers;

    /*
        Alternative syntax
     */
    if (typeof config === "function")  {
        linecallback = config;
        config = {};
    }

    linecallback = linecallback || function () {};
    config = config || {};

    if (config.skipEmptyLines === undefined) {
        config.skipEmptyLines = true;
    }

    /*
        We handle headers ourself
     */
    cfg.fileHasHeaders = !!config.headers;
    delete config['headers'];

    /**
     * [lineParser description]
     * @param  {[type]} line [description]
     * @return {[type]}      [description]
     */
    linePreprocessorParser = function (line) {

        var row = {},
            parsed = CSV.parse(line, config);

        if (!parsed.data[0]) {
            return;
        }

        if (cfg.fileHasHeaders) {
            if (!headers) {
                headers = parsed.data[0];
                return;
            }

            headers.forEach(function (e, i) {
                row[e] = parsed.data[0][i];
            });

        } else {
            row = parsed.data[0];
        }

        linecallback(row, lineCount++, parsed);

    }

    /**
     * @param  {string} filepath       filepath path to csv file
     * @param  {Function} onLineCallback Callback to be executed on line
     */
    readCsv = function (filepath) {

        var rd,
            fs = Npm.require('fs'),
            byline = Npm.require('byline'),
            Future = Npm.require('fibers/future'),
            future;

        future = new Future;

        rd = byline.createStream(fs.createReadStream(filepath));

        rd.on('error', function (err) {
            future.error();
        });

        rd.on('data', function (chunk, enc, next) {
            linePreprocessorParser(chunk.toString());
        });

        rd.on('end', function(line) {
            future.return();
        });

        return future.wait();
    };
    readCsv(filepath);
}


CSV.readCsvFileLineByLine = readCsvFileLineByLine();
export default CSV;
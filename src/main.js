const jsonld = require('jsonld');
const jsonld_request = require('jsonld-request');
const fs = require('fs');

const ntFile = '../testdata/work2.nt';
const frame = '../testdata/frame.json';
const builddir = "../build/data.json";

fs.readFile(ntFile, (err, ntdata) => {
    if (err) {
        throw err;
    }

    jsonld.fromRDF(ntdata.toString(), {format: 'application/nquads'}, function(err, ntdoc) {
        if (err) {
            throw err;
        }
        jsonld_request(frame, function (err, res, fr) {
            if (err) {
                throw err;
            }
            jsonld.frame(ntdoc, fr, function (err, framed) {

                fs.writeFile(builddir, JSON.stringify(framed, null, 2), function (err) {
                    if (err) {
                        throw err;
                    }

                    console.log(JSON.stringify(framed, null, 2))
                })
            });
        });
    });
});

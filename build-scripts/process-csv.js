const fs = require("fs");
const csv = require("csvtojson");
const chalk = require("chalk");
const gjv = require("geojson-validation");

const inFilePath = __dirname + "/../project-files/ANTARCTICA_20200701.txt";
const outFilePath = __dirname + "/../data/an_glaciers.json";
const filteredFeature = "Glacier";

csv({
        delimiter: "|"
    })
    .fromFile(inFilePath)
    .then(jsonObj => {
        jsonToGeoJson(jsonObj);
    });

function jsonToGeoJson(jsonObj) {

    const geojson = {
        type: "FeatureCollection",
        features: []
    };

    let feature;

    let featureCount = 0;

    jsonObj.forEach(obj => {
        if (obj.FEATURE_CLASS === filteredFeature) {

            feature = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [+obj.PRIM_LONG_DEC, +obj.PRIM_LAT_DEC],
                    elevation: obj.ELEV_IN_M
                },
                properties: {
                    FEATURE_NAME: obj.FEATURE_NAME
                }
            };

            geojson.features.push(feature);
            featureCount++;
        }
    });
    console.log(
        chalk.green(
            `${featureCount} "${filteredFeature}" features filtered from CSV file`
        )
    );

    validateGeoJson(geojson);
}

function validateGeoJson(geojson) {
    if (gjv.valid(geojson)) {
        console.log(chalk.green("this is valid GeoJSON!"));
        writeToFile(geojson);
    } else {
        console.log(chalk.red("Sorry, not valid GeoJSON."));
    }
}

function writeToFile(geojson) {
    fs.writeFile(outFilePath, JSON.stringify(geojson), "utf-8", err => {
        if (err) throw err;

        console.log(chalk.green("done writing file"));
    });
}
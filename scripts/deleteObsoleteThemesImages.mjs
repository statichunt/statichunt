import fs from "fs";
import themes from "../.json/themes-name.json" assert { type: "json" };

const folderPath = "./public/themes/";

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    if (!themes.includes(file.replace(".png", ""))) {
      fs.unlinkSync(folderPath + file);
      console.log(`Deleted: ${file}`);
    }
  });
});

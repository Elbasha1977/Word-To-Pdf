const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const libre = require('libreoffice-convert');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(fileUpload());

app.get('/',(req,res)=>{
    res.send('Server Running');
});

app.post('/convert',async(req,res)=>{

    try{

        if(!req.files || !req.files.file){
            return res.status(400).send('No file uploaded');
        }

        const file = req.files.file;

        const inputPath = path.join(__dirname,file.name);
        const outputPath = path.join(__dirname,'output.pdf');

        await file.mv(inputPath);

        const docxBuf = fs.readFileSync(inputPath);

        libre.convert(docxBuf,'.pdf',undefined,(err,done)=>{

            if(err){
                console.log(err);
                return res.status(500).send('Conversion Error');
            }

            fs.writeFileSync(outputPath,done);

            res.download(outputPath,'converted.pdf',()=>{

                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPath);

            });

        });

    }catch(error){

        console.log(error);
        res.status(500).send('Server Error');

    }

});
});
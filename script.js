const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const convertBtn = document.getElementById('convertBtn');
const fileName = document.getElementById('fileName');
const statusDiv = document.getElementById('status');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');

let selectedFile = null;

uploadBox.addEventListener('click',()=>{
    fileInput.click();
});

fileInput.addEventListener('change',(e)=>{

    selectedFile = e.target.files[0];

    if(selectedFile){
        fileName.innerHTML = `✅ ${selectedFile.name}`;
    }

});

uploadBox.addEventListener('dragover',(e)=>{
    e.preventDefault();
    uploadBox.style.borderColor = '#38bdf8';
});

uploadBox.addEventListener('drop',(e)=>{
    e.preventDefault();

    selectedFile = e.dataTransfer.files[0];

    if(selectedFile){
        fileName.innerHTML = `✅ ${selectedFile.name}`;
    }
});

convertBtn.addEventListener('click',async()=>{

    if(!selectedFile){
        alert('اختر ملف Word أولاً');
        return;
    }

    progressContainer.style.display = 'block';
    progressBar.style.width = '30%';

    statusDiv.innerHTML = '⏳ جاري رفع الملف...';

    const formData = new FormData();
    formData.append('file',selectedFile);

    try{

        const response = await fetch('https://word-to-pdf-d9c0.onrender.com',{
            method:'POST',
            body:formData
        });

        progressBar.style.width = '80%';
});

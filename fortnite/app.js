function startVideo() {
    console.info('入出力デバイスを確認してビデオを開始するよ！');

    Promise.resolve()
        .then(function () {
            return navigator.mediaDevices.enumerateDevices();
        })
        .then(function (mediaDeviceInfoList) {
            console.log('使える入出力デバイスs->', mediaDeviceInfoList);

            var videoDevices = mediaDeviceInfoList.filter(function (deviceInfo) {
                return deviceInfo.kind == 'videoinput';
            });
            if (videoDevices.length < 1) {
                throw new Error('ビデオの入力デバイスがない、、、、、。');
            }

            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    deviceId: videoDevices[0].deviceId
                }
            });
        })
        .then(function (mediaStream) {
            console.log('取得したMediaStream->', mediaStream);
            videoStreamInUse = mediaStream;
            //document.querySelector('video').src = window.URL.createObjectURL(mediaStream);
            // 対応していればこっちの方が良い
             document.querySelector('video').srcObject = mediaStream;


        })
        .catch(function (error) {
            console.error('ビデオの設定に失敗、、、、', error);
        });
}

function stopVideo() {
    console.info('ビデオを止めるよ！');

    videoStreamInUse.getVideoTracks()[0].stop();

    if (videoStreamInUse.active) {
        console.error('停止できかた、、、', videoStreamInUse);
    } else {
        console.log('停止できたよ！', videoStreamInUse);
    }
}

function snapshot() {
    console.info('スナップショットをとるよ！');

    var videoElement = document.querySelector('video');
    var canvasElement = document.querySelector('canvas');
    var context = canvasElement.getContext('2d');

    context.drawImage(videoElement, 0, 0, videoElement.width, videoElement.height);
    document.querySelector('img').src = canvasElement.toDataURL('image/webp');
}

/*
// Send API Request to Cloud Vision API
const sendAPI = (base64string) => {
let body = {
  requests: [
    {image: {content: base64string}, features: [{type: 'TEXT_DETECTION'}]}
  ]
};
let xhr = ;
xhr.open('POST', `${url}?key=${api_key}`, true);
xhr.setRequestHeader('Content-Type', 'application/json');
const p = new Promise((resolve, reject) => {
  xhr.onreadystatechange = () => {
    if (xhr.readyState != XMLHttpRequest.DONE) return;
    if (xhr.status >= 400) return reject({message: `Failed with ${xhr.status}:${xhr.statusText}`});
    resolve(JSON.parse(xhr.responseText));
  };
})
xhr.send(JSON.stringify(body));
return p;
}
*/

function ocrRequest(){

  xhr = new XMLHttpRequest();

  img = document.getElementById('snapshot')
  base64img = imageToBase64(img)
  base64img = base64img.replace(/^data:image\/(png|jpeg);base64,/, '')

  requestBody = {
    requests: [
      { 
        image: { content: base64img },
        features: [ { type: 'TEXT_DETECTION' } ]
      }
    ]
  };

  api_key = 'AIzaSyCSNagN0YiVjNxc12WLbuyiZTkYtym0eG0';
  url = 'https://vision.googleapis.com/v1/images:annotate';
  xhr.open('POST', url + "?key=" + api_key, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
//  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.onreadystatechange = function(){
    if (xhr.readyState != XMLHttpRequest.DONE){
      if( xhr.status == 200) {
        console.log("OCRリクエスト成功。");
        console.log(xhr.response);
      } else if(xhr.status >= 400) {
        console.log("OCRリクエスト失敗。:" + xhr.status);
        console.log(xhr.response);
      }
    }
  }
  xhr.send(JSON.stringify(requestBody));
}

function imageToBase64(img) {
    // New Canvas
    var canvas = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;
    // Draw Image
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // To Base64
    return canvas.toDataURL("image/jpeg");
}

function dumpImageAsBase64() {
  img = document.getElementById('snapshot')
  base64img = imageToBase64(img)
  console.log("width : " + img.width)
  console.log("height: " + img.height)
  
  console.log(base64img)
}


/*
// Read input file
const readFile = (file) => {
let reader = new FileReader();
const p = new Promise((resolve, reject) => {
  reader.onload = (ev) => {
    document.querySelector('img').setAttribute('src', ev.target.result);
    resolve(ev.target.result.replace(/^data:image\/(png|jpeg);base64,/, ''));
  };
})
reader.readAsDataURL(file);
return p;
};
// Event handling
document.querySelector('input').addEventListener('change', ev => {
if (!ev.target.files || ev.target.files.length == 0) return;
Promise.resolve(ev.target.files[0])
  .then(readFile)
  .then(sendAPI)
  .then(res => {
    console.log('SUCCESS!', res);
    document.querySelector('pre').innerHTML = JSON.stringify(res, null, 2);
  })
  .catch(err => {
    console.log('FAILED:(', err);
    document.querySelector('pre').innerHTML = JSON.stringify(err, null, 2);
  });
});
*/



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

  img = document.getElementById('snapshotImage')
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
        
        ocrResultList = parseOcrResult(xhr.response);
        getTrackerAll(ocrResultList)
        
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
  img = document.getElementById('snapshotImage')
  base64img = imageToBase64(img)
  console.log("width : " + img.width)
  console.log("height: " + img.height)
  
  console.log(base64img)
}

function parseOcrResult(ocrResult) {
  descriptionArray = []
  ocrResult.responses[0].textAnnotations.forEach(function(element){
    if(!element.description.match(/\n/)) {
      descriptionArray.push(element.description)
    }
  });
  return descriptionArray;
}

function getTrackerAll(userNicknameList) {
  if(userNicknameList.length == 0) {
    return;
  } 
  userNickname = userNicknameList.pop();
  
  fortniteTrackerRequest(userNickname).then(function(trackerResult){
      // 3秒待ってから次のリクエストをする
      setTimeout(function(){
        getTrackerAll(userNicknameList);
      }, 3000)
      
    }).catch(function(error){
      console.log("Trackerリクエスト失敗により中止。")
      console.log(error)
    })
  
}

function fortniteTrackerRequest(userNickname) {
  xhr = new XMLHttpRequest();

  api_key = 'e989cc22-f52b-4821-8df7-a7d7229bfe2d';
  url = 'https://api.fortnitetracker.com/v1/profile';
  user_platform = 'pc'
  user_nickname = userNickname
  xhr.open('GET', url + '/' + user_platform + '/' + user_nickname);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('TRN-Api-Key', api_key);
  xhr.setRequestHeader('Origin', https://roloa.github.io)
  promise = new Promise( function(resolve, reject) {
    xhr.onreadystatechange = function(){
      if (xhr.readyState != XMLHttpRequest.DONE){
        if( xhr.status == 200) {
          console.log("Trackerリクエスト成功。");
          console.log(xhr.response);
          resolve(xhr.response)
        } else if(xhr.status >= 400) {
          console.log("Trackerリクエスト失敗。:" + xhr.status);
          console.log(xhr.response);
          reject(xhr.status + ": response => " + xhr.response)
        }
      }
    }
  });
  xhr.send();
  return promise;
}

function testrun() {
  console.log("テストラン！")
  testJsonString = '{"responses":[{"textAnnotations":[{"locale":"en","description":"Yut4o\\nhirofit\\n","boundingPoly":{"vertices":[{"x":134,"y":72},{"x":257,"y":72},{"x":257,"y":171},{"x":134,"y":171}]}},{"description":"Yut4o","boundingPoly":{"vertices":[{"x":134,"y":78},{"x":246,"y":72},{"x":248,"y":112},{"x":136,"y":118}]}},{"description":"hirofit","boundingPoly":{"vertices":[{"x":140,"y":146},{"x":254,"y":134},{"x":257,"y":159},{"x":143,"y":171}]}}],"fullTextAnnotation":{"pages":[{"property":{"detectedLanguages":[{"languageCode":"en","confidence":0.58}]},"width":320,"height":240,"blocks":[{"boundingBox":{"vertices":[{"x":134,"y":78},{"x":246,"y":72},{"x":248,"y":112},{"x":136,"y":118}]},"paragraphs":[{"boundingBox":{"vertices":[{"x":134,"y":78},{"x":246,"y":72},{"x":248,"y":112},{"x":136,"y":118}]},"words":[{"boundingBox":{"vertices":[{"x":134,"y":78},{"x":246,"y":72},{"x":248,"y":112},{"x":136,"y":118}]},"symbols":[{"boundingBox":{"vertices":[{"x":134,"y":78},{"x":151,"y":77},{"x":153,"y":117},{"x":136,"y":118}]},"text":"Y"},{"boundingBox":{"vertices":[{"x":154,"y":77},{"x":174,"y":76},{"x":176,"y":116},{"x":156,"y":117}]},"text":"u"},{"boundingBox":{"vertices":[{"x":174,"y":76},{"x":193,"y":75},{"x":195,"y":115},{"x":176,"y":116}]},"text":"t"},{"boundingBox":{"vertices":[{"x":194,"y":75},{"x":214,"y":74},{"x":216,"y":114},{"x":196,"y":115}]},"text":"4"},{"property":{"detectedBreak":{"type":"EOL_SURE_SPACE"}},"boundingBox":{"vertices":[{"x":215,"y":74},{"x":247,"y":72},{"x":249,"y":112},{"x":217,"y":114}]},"text":"o"}]}]}],"blockType":"TEXT"},{"property":{"detectedLanguages":[{"languageCode":"en","confidence":1}]},"boundingBox":{"vertices":[{"x":140,"y":146},{"x":254,"y":134},{"x":257,"y":159},{"x":143,"y":171}]},"paragraphs":[{"property":{"detectedLanguages":[{"languageCode":"en","confidence":1}]},"boundingBox":{"vertices":[{"x":140,"y":146},{"x":254,"y":134},{"x":257,"y":159},{"x":143,"y":171}]},"words":[{"property":{"detectedLanguages":[{"languageCode":"en"}]},"boundingBox":{"vertices":[{"x":140,"y":146},{"x":254,"y":134},{"x":257,"y":159},{"x":143,"y":171}]},"symbols":[{"property":{"detectedLanguages":[{"languageCode":"en"}]},"boundingBox":{"vertices":[{"x":140,"y":147},{"x":152,"y":146},{"x":154,"y":168},{"x":142,"y":169}]},"text":"h"},{"property":{"detectedLanguages":[{"languageCode":"en"}]},"boundingBox":{"vertices":[{"x":163,"y":148},{"x":166,"y":148},{"x":168,"y":166},{"x":165,"y":166}]},"text":"i"},{"property":{"detectedLanguages":[{"languageCode":"en"}]},"boundingBox":{"vertices":[{"x":174,"y":153},{"x":184,"y":152},{"x":185,"y":164},{"x":175,"y":165}]},"text":"r"},{"property":{"detectedLanguages":[{"languageCode":"en"}]},"boundingBox":{"vertices":[{"x":189,"y":153},{"x":199,"y":152},{"x":200,"y":162},{"x":190,"y":163}]},"text":"o"},{"property":{"detectedLanguages":[{"languageCode":"en"}]},"boundingBox":{"vertices":[{"x":208,"y":139},{"x":219,"y":138},{"x":221,"y":160},{"x":210,"y":161}]},"text":"f"},{"property":{"detectedLanguages":[{"languageCode":"en"}]},"boundingBox":{"vertices":[{"x":227,"y":142},{"x":232,"y":141},{"x":234,"y":158},{"x":229,"y":159}]},"text":"i"},{"property":{"detectedLanguages":[{"languageCode":"en"}],"detectedBreak":{"type":"EOL_SURE_SPACE"}},"boundingBox":{"vertices":[{"x":245,"y":136},{"x":254,"y":135},{"x":256,"y":159},{"x":247,"y":160}]},"text":"t"}]}]}],"blockType":"TEXT"}]}],"text":"Yut4o\\nhirofit\\n"}}]}'
  testResult = JSON.parse(testJsonString)
  returnVal = parseOcrResult(testResult);
  console.log(returnVal)
  getTrackerAll(returnVal)
}



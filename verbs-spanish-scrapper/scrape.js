const fs = require('fs');
const qs = require('querystring');
const cheerio = require('cheerio');
const limit = require('simple-rate-limiter');
const request = limit(require('request')).to(10).per(1000);
const https = require('https');
const httpsRequest = limit(https.request).to(10).per(1000);

const URL = 'https://www.vocabulix.com';
const PATH = 'conjugacion2';
let options = {
  hostname: URL,
  method: 'GET',
}

let letterString = 'a_a1_a2_b_c_c1_d_d1_e_e1_f_g_h_i_j_k_l_m_n_o_p1_q_r1_s_t_u_v_w_x_y_z';
function scrape(letterString){
  let letters = letterString.split('_');
  fetchVerbs(letters).then(function(verbs){
    console.log(verbs);
    let json = JSON.stringify(verbs);
    return fs.writeFile('verbs.json', json, 'utf8');
  });
}

function fetchVerbs(letters){
  let verbs = {};
  return new Promise(function(resolve, reject){
    letters.forEach(function(letter){
      
      let path = `${PATH}/${letter}_spanish.html`;
      let url = `${URL}/${path}`;
      
      makeRequest(url).then(function(data){
        data = data.replace(/<!DOCTYPE[\s\S]*?<\/head>/g, '');
        data = data.replace(/<\/body>[\s\S]*?<\/html>/g, '</body>');
        fillVerbs(data).then(function(verbsArr){
          verbs[letter] = verbsArr;
        });
      }).catch(function(err){
        console.log(err);
      });

      if (letter == 'z') {
        resolve(verbs);
      }

    });
  });
}

function fillVerbs(data){
  let verbs = [];
  let $ = cheerio.load(`"${data}"`);
  let verbLinks = $('.indexWrapper .indexColumn a');
  let length = verbLinks.get().length;
  return new Promise(function(resolve, reject){
    verbLinks.each(function(i, el){
      let verb = $(this).text();
      verbs.push(verb);
      if (i > length) {
        resolve(verbs);
        return false;
      }
    });
  });
}

function makeRequest(url){
  return new Promise(function(resolve, reject){
    request(url, function(error, response, body){
      if (error) {
        console.log('error:', error); 
      }
      console.log('statusCode:', response.statusCode); 

      resolve(response.body);
    });
  });
}

function makeHttpsReq(options = {}){
  return new Promise(function(resolve, reject){
    let req = https.request(options, (res) => {

      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.setEncoding('utf8');
      res.on('data', (d) => {
        resolve(d);
      });
    });
    
    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
}

scrape(letterString);
// users();
// oAuth();
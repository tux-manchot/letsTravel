let csrfToken = document.querySelector('#csrfToken');
let baseUrl = document.querySelector('#baseUrl');
let issuer = document.querySelector('#issuer');
let redirectUri = document.querySelector('#redirectUri');
let defaultThemeBtn = document.querySelector('.default-theme-btn');
let backgroundThemeBtn = document.querySelector('.background-theme-btn');
let darkThemeBtn = document.querySelector('.dark-theme-btn');
let minimalThemeBtn = document.querySelector('.minimal-theme-btn');

document.addEventListener('DOMContentLoaded', async function(){
  const signIn = new OktaSignIn({
    baseUrl: baseUrl.value, 
    relayState: redirectUri.value,
    redirectUri: redirectUri.value,
    logo: '/images/logo.png',
    features: {
      passwordless: true,
      registration: true,
      rememberMe: true,
      router: true,
      idpDiscovery: true,
      webauthn: true,
      multiOptionalFactorEnroll: true
    },
    idpDiscovery:{
        requestContext: redirectUri.value
    },
    authParams: {
      // pkce: true,          // enable PKCE (works only with http://localhost or https)
      issuer: issuer.value,
      responseType: 'code',
      responseMode: 'form_post', 
    },
    idps: [
      // for preview
      {type: 'Facebook', id: '0oaoa5vs8z5mFfk6p0x6'}, 
      {type: 'Microsoft', id: '0oaswymldrsRKAC8x0x6'}
      // for prod
      // {type: 'Facebook', id: '0oa5i4g62UaFu3pdB416'}, 
      // {type: 'Microsoft', id: '0oa6g9u96yUhvG5Cw416'}
    ],
    idpDisplay: 'SECONDARY'
  });

  signIn.renderEl({ el: '#app-container' }, (res) => {
    let form = document.createElement('form');
    form.method = 'POST';
    form.action = '/signin';
    document.body.append(form);

    let sessionTokenField = document.createElement('input');
    sessionTokenField.type = ('hidden');
    sessionTokenField.name = ('sessionToken');
    sessionTokenField.value = (res.session.token);

    let csrfTokenField = document.createElement('input');
    csrfTokenField.type = 'hidden';
    csrfTokenField.name = '_csrf';
    csrfTokenField.value = csrfToken.value;

    form.appendChild(sessionTokenField);
    form.appendChild(csrfTokenField);

    baseUrl.remove();
    csrfToken.remove();
    issuer.remove();

    form.submit();

  }, (err) => {
    console.error(err);
  });
});

function swapStyleSheet(sheet) {
  document.getElementById("themeStyle").setAttribute("href", sheet);  
}

defaultThemeBtn.addEventListener('click', () => {
  swapStyleSheet('/css/okta-theme-default.css')
});
backgroundThemeBtn.addEventListener('click', () => {
  swapStyleSheet('/css/okta-theme-background.css')
});
darkThemeBtn.addEventListener('click', () => {
  swapStyleSheet('/css/okta-theme-dark.css')
});
minimalThemeBtn.addEventListener('click', () => {
  swapStyleSheet('/css/okta-theme-minimal.css')
});
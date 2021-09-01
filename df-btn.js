const wrapper = document.querySelector('#df-btn')
 var screenWidth = window.innerWidth;
 // var screenHeight = document.body.clientHeight;
 // alert(screenWidth);
const config = {
    src: wrapper.getAttribute('src'),
    project: wrapper.getAttribute('project'),
    width: wrapper.getAttribute('width'),
    height: wrapper.getAttribute('height'),
    openText: wrapper.getAttribute('openText'),
    closeText: wrapper.getAttribute('closeText'),
    background: wrapper.getAttribute('background'),
    backgroundDark: wrapper.getAttribute('backgroundDark'),
    logo: wrapper.getAttribute('logo'),
    logoDark: wrapper.getAttribute('logoDark')
}

const origin = config.src.substring(0, config.src.lastIndexOf('/'))

if (!config.project){
    console.warn('Please specify your project ID in attributes!')
}

else {
    const style = document.createElement('style')
    style.innerHTML = `
    .df-btn {
        padding: 0;
        border: none;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 1px 3px 1px rgba(60,64,67,0.149);
        font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: ${config.background || '#FEFFFF'};
        border-radius: 34px;
        cursor: pointer;
        transition: all .45s cubic-bezier(.4, 0, .2, 1);
        position: fixed;
        bottom: 10px;
        right: 10px;
        margin: 16px;
        display: flex;
        flex-direction: column;
        z-index: 9999;
        opacity:1 !important;
    }

    .df-btn-text {
        min-width: 80px;
        display: inline-flex;
        align-items: center;
        padding: 2px 4px 2px 4px;
        font-size: 15px;
        height: 45px;
    }
    .df-btn.df-closed .df-btn-text {
        height: 80px;
    }
    .df-btn-hide {
        display:none;
        font-size: 17px;
        padding: 0px 0px 6px 8px;
    }

    .df-closed > .df-btn-text:hover + .df-btn-hide  {
        display: inline-flex;
        
    }

    .df-btn-text:before {
        min-width: 62px;
        height: 70px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 70px;
        background-image: url('${config.logo || origin + '/assets/logo.svg'}');
        content: '';
    }

    .df-btn-text:hover:before {
        padding : 0px 45px;
    }

    button.df-btn:hover {
        opacity: 1 !important
    }
    
     button.df-btn {
        opacity: 1 !important
    }

    .df-btn:not(.df-closed){
        border-radius: 16px;
        width: 50%;
        height:90%
    }

    .df-btn:not(.df-closed) > .df-btn-text:before {
        background-image: url('assets/minus.svg');
        background-size: 24px;
    
    }

    .df-btn-content {
        display: block;
        border: 0;
        height: ${config.height || '600px'};
        width: 100%;
        transition: all .45s cubic-bezier(.4, 0, .2, 1);
        float: right;
        opacity: 1;
       
    
    }

    .df-btn:not(.df-closed) > .df-btn-content {
        padding-bottom: 16px;
    }

    .df-closed > .df-btn-content {
        width: 0;
        height: 0;
        opacity: 0
    }

    @media screen and (max-width: 720px){

        .df-btn:not(.df-closed) > .df-btn-content {
            width: 100vw;
            max-height: 100vh;
            height: calc(100vh - 56px);
            padding-bottom: 0px
        }

        .df-btn-text {
            padding: 0;
            height: 56px;
            font-size: 0;
        }
    }
     @media screen and (max-width: 600px){
         .df-btn {
            border-radius: 10px;
        }

        .df-btn:not(.df-closed) {
            margin: 0px;
            border-radius: 0px;
            height:100%;
            width: 90%;
            border-radius: 16px;
        }
        button.df-btn:not(.df-closed) {
            height: 95%;
        }
        .df-btn:not(.df-closed) > .df-btn-content {
        display: block;
        border: 0;
        height: 100%; 
        width: 100%;
        transition: all .45s cubic-bezier(.4, 0, .2, 1);
        float: right;
        opacity: 1;
    }
    df-btn-text {
            padding: 0;
            height: 10px;
            font-size: 0;
        }
    }

    @media (prefers-color-scheme: dark){
        .df-btn-content {
        display: block;
        border: 0;
        height: ${config.height || '600px'};
        width: ${config.width || '400px'};
        transition: all .45s cubic-bezier(.4, 0, .2, 1);
        float: right;
        opacity: 1;
    
    }
        .df-btn {
            background-color: ${config.backgroundDark || '#171717'}
        }

        .df-btn-text {
            color: white
        }

        .df-btn-text:before {
            background-image: url('${config.logoDark || origin + '/assets/logo_dark.svg'}')
        }

        .df-btn:not(.df-closed) > .df-btn-text:before {
            background-image: url('${origin}/assets/close_dark.svg')
        }
    }`

    document.head.appendChild(style)
    document.write(`
        <button class="df-btn df-closed" onclick="dfToggle()">
            <span class="df-btn-text"></span>
            <span class = "df-btn-hide">${config.openText || 'Chat'}</span>
            <iframe id="myFrame" class="df-btn-content" src="${config.project}" allow= "microphone;" allowtransparency="false"></iframe>
        </button>
    `)

    let dfToggled = false
    let hasSeen = false
    let hoverApplied = true
    window.dfToggle = () => {
        hasSeen ? config.project = "https://lts-bot-prayas.web.app" : config.project = "bot_intro.html"
        hasSeen = true
        document.querySelector('.df-btn').classList = dfToggled ? 'df-btn df-closed' : 'df-btn'
        // below line is not useful from now onwards and can be removed as it contains empty values
        // document.querySelector('.df-btn-text').innerText = dfToggled ? ('' || '') : ("" || '')
        // document.querySelector('.df-btn-text').classList = hoverApplied ? document.querySelector('.df-btn-text').classList = 'df-btn-text df-apply-hover' : 'df-btn-text'
        dfToggled = !dfToggled
        hoverApplied = !hoverApplied
        if (document.querySelector('.df-btn').classList == 'df-btn df-closed' ) {
              document.getElementById("myFrame").src = "https://wwf.org";
        }else{ document.getElementById("myFrame").src = config.project;
        }
    }
        // if (document.querySelector('.df-btn').classList === df-btn df-closed ) {
        //     // document.querySelector("df-btn-content").src = config.project
        //     alert("here")
        // }


}

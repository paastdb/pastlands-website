// Get all menu items
const items = document.querySelectorAll("#menuList li");

// Keep track of selected item
let selected = 0;

// Language support (optional)
const language = document.getElementById("language");

const languages = [
    "ENGLISH",
    "ESPAÑOL",
    "FRANÇAIS",
    "日本語",
    "한국어"
];

const translations = {
    ENGLISH: {
        controlSelect: "SELECT : ▲ ▼ ▶ KEY",
        controlSet: "SET     : ENTER KEY",
        controlEnd: "END     : ESCAPE KEY",
        myworkTitle: "MY WORK",
        videos: "VIDEOS",
        photos: "PHOTOS",
        coding: "CODING",
        back: "BACK",
        menu: "MENU",
        about: "ABOUT",
        mywork: "MY WORK",
        language: "LANGUAGE:",
        about1: "I am a creative director who specializes in",
        about2: "video editing, digital design, web development,",
        about3: "and programming."
    },
    ESPAÑOL: {
        controlSelect: "SELECCIONAR : ▲ ▼ ▶",
        controlSet: "ACEPTAR : ENTER",
        controlEnd: "SALIR : ESC",
        myworkTitle: "MI TRABAJO",
        videos: "VIDEOS",
        photos: "FOTOS",
        coding: "PROGRAMACIÓN",
        back: "ATRÁS",
        menu: "MENÚ",
        about: "SOBRE MÍ",
        mywork: "MI TRABAJO",
        language: "IDIOMA:",
        about1: "Soy un director creativo especializado en",
        about2: "edición de video, diseño digital, desarrollo web,",
        about3: "y programación."
    },
    FRANÇAIS: {
        controlSelect: "SÉLECTION : ▲ ▼ ▶",
        controlSet: "VALIDER : ENTRÉE",
        controlEnd: "QUITTER : ÉCHAP",
        myworkTitle: "MES PROJETS",
        videos: "VIDÉOS",
        photos: "PHOTOS",
        coding: "PROGRAMMATION",
        back: "RETOUR",
        menu: "MENU",
        about: "À PROPOS",
        mywork: "MES PROJETS",
        language: "LANGUE :",
        about1: "Je suis un directeur créatif spécialisé dans",
        about2: "le montage vidéo, le design numérique, le développement web,",
        about3: "et la programmation."
    },
    日本語: {
        controlSelect: "選択 : ▲ ▼ ▶",
        controlSet: "決定 : ENTER",
        controlEnd: "終了 : ESC",
        myworkTitle: "作品",
        videos: "動画",
        photos: "写真",
        coding: "プログラミング",
        back: "戻る",
        menu: "メニュー",
        about: "概要",
        mywork: "作品",
        language: "言語:",
        about1: "私はクリエイティブディレクターで、",
        about2: "映像編集、デジタルデザイン、Web開発、",
        about3: "プログラミングを専門としています。"
    },
    한국어: {
        controlSelect: "선택 : ▲ ▼ ▶",
        controlSet: "확인 : ENTER",
        controlEnd: "종료 : ESC",
        myworkTitle: "작업",
        videos: "동영상",
        photos: "사진",
        coding: "프로그래밍",
        back: "뒤로",
        menu: "메뉴",
        about: "소개",
        mywork: "작업",
        language: "언어:",
        about1: "저는 크리에이티브 디렉터로서",
        about2: "영상 편집, 디지털 디자인, 웹 개발,",
        about3: "프로그래밍을 전문으로 합니다."
    }
};

let currentLanguage = 0;

// Find which item contains the language selector
let languageIndex = -1;

items.forEach((item, index) => {
    if (item.querySelector("#language")) {
        languageIndex = index;
    }

    // Allow mouse click
    item.addEventListener("click", () => {
        selected = index;
        updateSelection();

        // If the language option was clicked, cycle to the next language.
        if (index === languageIndex) {
            nextLanguage();
        } else {
            activateItem();
        }
    });

    item.addEventListener("mouseenter", () => {
        selected = index;
        updateSelection();
    });
});

// Highlight selected item
function updateSelection() {
    items.forEach(item => item.classList.remove("selected"));

    if (items[selected]) {
        items[selected].classList.add("selected");
    }

    // Capture the CRT texture when selection state changes
    if (typeof captureWebpage === "function") {
        captureWebpage();
    }
}

function updateLanguage(languageName) {
    // Change all translated text
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (
            translations[languageName] &&
            translations[languageName][key]
        ) {
            element.textContent = translations[languageName][key];
        }
    });

    // Update the language display
    if (language) {
        language.textContent = languageName;
    }

    // Save language
    localStorage.setItem("language", languageName);

    // Recapture CRT canvas after text/layout updates
    if (typeof captureWebpage === "function") {
        captureWebpage();
    }
}

function nextLanguage() {
    currentLanguage++;

    if (currentLanguage >= languages.length) {
        currentLanguage = 0;
    }

    updateLanguage(languages[currentLanguage]);
}

// Go to the selected link
function activateItem() {
    const link = items[selected].dataset.link;

    if (!link) return;

    // External links open in new tab
    if (link.startsWith("http://") || link.startsWith("https://")) {
        window.open(link, "_blank");
    } else {
        window.location.href = link;
    }
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            e.preventDefault();
            selected--;
            if (selected < 0) selected = items.length - 1;
            updateSelection();
            break;

        case "ArrowDown":
            e.preventDefault();
            selected++;
            if (selected >= items.length) selected = 0;
            updateSelection();
            break;

        case "ArrowLeft":
            if (selected === languageIndex && language) {
                currentLanguage--;
                if (currentLanguage < 0) currentLanguage = languages.length - 1;
                updateLanguage(languages[currentLanguage]);
            }
            break;

        case "ArrowRight":
            if (selected === languageIndex && language) {
                currentLanguage++;
                if (currentLanguage >= languages.length) currentLanguage = 0;
                updateLanguage(languages[currentLanguage]);
            }
            break;

        case "Enter":
            e.preventDefault();
            activateItem();
            break;
    }
});

// Restore saved language
const savedLanguage = localStorage.getItem("language");

if (savedLanguage && languages.includes(savedLanguage)) {
    currentLanguage = languages.indexOf(savedLanguage);
    updateLanguage(savedLanguage);
}
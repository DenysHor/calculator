let heaterModelsData = {
    "TWP": {
        "name": {"uk": "Гібрідний обігрівач", "en": "Hybrid infrared heater"},
        "models": [
            { "model": {"uk": "TWP 300", "en": "TWP 300"}, "power": 300, "priceUAH": 1500, "priceEUR": 40 },
            { "model": {"uk": "TWP 500", "en": "TWP 500"}, "power": 500, "priceUAH": 2000, "priceEUR": 50 },
            { "model": {"uk": "TWP 700", "en": "TWP 700"}, "power": 700, "priceUAH": 2500, "priceEUR": 60 },
            { "model": {"uk": "TWP 1000", "en": "TWP 1000"}, "power": 1000, "priceUAH": 3000, "priceEUR": 75 }
        ]
    },
    "IAH": {
        "name": {"uk": "Стельовий алюмінієвий обігрівач", "en": "Ceiling aluminium heater"},
        "models": [
            { "model": {"uk": "HSteel IAH 500", "en": "HSteel IAH 500"}, "power": 500, "priceUAH": 1800, "priceEUR": 45 },
            { "model": {"uk": "HSteel IAH 800", "en": "HSteel IAH 800"}, "power": 800, "priceUAH": 2200, "priceEUR": 55 },
            { "model": {"uk": "HSteel IAH 1000", "en": "HSteel IAH 1000"}, "power": 1000, "priceUAH": 2600, "priceEUR": 65 },
            { "model": {"uk": "HSteel IAH 1300", "en": "HSteel IAH 1300"}, "power": 1300, "priceUAH": 3000, "priceEUR": 75 },
            { "model": {"uk": "HSteel IAH 2000", "en": "HSteel IAH 2000"}, "power": 2000, "priceUAH": 3500, "priceEUR": 90 }
        ]
    }
};
let selectedHeaters = [];
let heatLossCalculated = false;
let heatLossData = {};
let heatLossChart = null;
const translations = {
    uk: {
        "Калькулятор тепловтрат приміщення": "Калькулятор тепловтрат приміщення",
        "Будь ласка, введіть параметри приміщення для розрахунку тепловтрат.": "Будь ласка, введіть параметри приміщення для розрахунку тепловтрат.",
        "Оберіть мову:": "Оберіть мову:",
        "Перемкнути тему": "Перемкнути тему",
        "Зберегти дані": "Зберегти дані",
        "Скинути все": "Скинути все",
        "Типові значення": "Типові значення",
        "1. Загальна інформація": "1. Загальна інформація",
        "Тип будівлі:": "Тип будівлі:",
        "Новий багатоквартирний дім":"Новий багатоквартирний дім",
        "Висота стелі (м):": "Висота стелі (м):",
        "Зовнішня температура (°C):": "Зовнішня температура (°C):",
        "Внутрішня температура (°C):": "Внутрішня температура (°C):",
        "Площа приміщення (м²):": "Площа приміщення (м²):",
        "2. Додаткова інформація": "2. Додаткова інформація",
        "Стіни": "Стіни",
        "Кількість зовнішніх стін:": "Кількість зовнішніх стін:",
        "Матеріал зовнішніх стін:": "Матеріал зовнішніх стін:",
        "Товщина зовнішніх стін (м):": "Товщина зовнішніх стін (м):",
        "Сусідні приміщення:": "Сусідні приміщення:",
        "Загальна площа зовнішніх стін (м²):": "Загальна площа зовнішніх стін (м²):",
        "Вікна": "Вікна",
        "Кількість вікон:": "Кількість вікон:",
        "Площа одного вікна (м²):": "Площа одного вікна (м²):",
        "Тип вікон:": "Тип вікон:",
        "Двері": "Двері",
        "Кількість зовнішніх/вхідних дверей:": "Кількість зовнішніх/вхідних дверей:",
        "Площа одних дверей (м²):": "Площа одних дверей (м²):",
        "Матеріал дверей:": "Матеріал дверей:",
        "Стеля": "Стеля",
        "Матеріал стелі/даху:": "Матеріал стелі/даху:",
        "Товщина стелі/даху (м):": "Товщина стелі/даху (м):",
        "Підлога": "Підлога",
        "Тип підлоги:": "Тип підлоги:",
        "Вентиляція": "Вентиляція",
        "Тип вентиляції:": "Тип вентиляції:",
        "Розрахувати тепловтрати": "Розрахувати тепловтрати",
        "Розрахунок тепловтрат": "Розрахунок тепловтрат",
        "Результати розрахунку:": "Результати розрахунку:",
        "Тепловтрати через конструкції:": "Тепловтрати через конструкції:",
        "Тепловтрати на вентиляцію:": "Тепловтрати на вентиляцію:",
        "Загальні тепловтрати з вентиляцією:": "Загальні тепловтрати з вентиляцією:",
        "Рекомендована загальна потужність обігрівачів:": "Рекомендована загальна потужність обігрівачів:",
        "Обрані обігрівачі:": "Обрані обігрівачі:",
        "Приблизна вартість опалення": "Приблизна вартість опалення",
        "Тип утеплення": "Тип утеплення",
        "Приміщення зверху": "Приміщення зверху",
        "Приміщення знизу": "Приміщення знизу",
        "€": "€",
        "Вт": "Вт",
        "кВт": "кВт",
        "3. Вибір обігрівачів": "3. Вибір обігрівачів",
        "Оберіть обігрівачі зі списку для вашого приміщення.": "Оберіть обігрівачі зі списку для вашого приміщення.",
        "Додати власний обігрівач": "Додати власний обігрівач",
        "Автоматичний підбір": "Автоматичний підбір",
        "Вартість електроенергії (грн/кВт·год):": "Вартість електроенергії (грн/кВт·год):",
        "Приблизна вартість опалення за годину:": "Приблизна вартість опалення за годину:",
        "Приблизна вартість опалення за добу:": "Приблизна вартість опалення за добу:",
        "Приблизна вартість опалення за місяць:": "Приблизна вартість опалення за місяць:",
        "Приблизна вартість опалення за сезон (5 місяців):": "Приблизна вартість опалення за сезон (5 місяців):",
        "грн": "грн",
        "Перевірити потужність обігрівачів": "Перевірити потужність обігрівачів",
        "Надіслати розрахунок на email": "Надіслати розрахунок на email",
        "Ваш email:": "Ваш email:",
        "Показати підсумок розрахунку": "Показати підсумок розрахунку",
        "Завантажити PDF": "Завантажити PDF",
        "Відправити": "Відправити",
        "Підсумок розрахунку тепловтрат": "Підсумок розрахунку тепловтрат",
        "Дата та час розрахунку:": "Дата та час розрахунку:",
        "Введені параметри": "Введені параметри",
        "Обрані обігрівачі:": "Обрані обігрівачі:",
        "Перевірка потужності обігрівачів:": "Перевірка потужності обігрівачів:",
        "Наші реквізити:": "Наші реквізити:",
        "Назва компанії:": "Назва компанії:",
        "Контактний номер:": "Контактний номер:",
        "Email:": "Email:",
        "Вебсайт:": "Вебсайт:",
        "Серія обігрівача": "Серія обігрівача",
        "Модель обігрівача": "Модель обігрівача",
        "Кількість": "Кількість",
        "Оберіть серію": "Оберіть серію",
        "Оберіть модель": "Оберіть модель",
        "Додати обігрівач": "Додати обігрівач",
        "Видалити": "Видалити",
        "Введіть серію обігрівача": "Введіть серію обігрівача:",
        "Введіть модель обігрівача": "Введіть модель обігрівача:",
        "Введіть потужність (Вт)": "Введіть потужність (Вт):",
        "Обігрівач додано": "Обігрівач додано!",
        "Некоректні дані": "Некоректні дані!",
        "Спочатку розрахуйте тепловтрати": "Спочатку розрахуйте тепловтрати!",
        "Оберіть обігрівачі": "Оберіть обігрівачі.",
        "Загальна потужність обігрівачів": "Загальна потужність обігрівачів",
        "менша за рекомендовану": "менша за рекомендовану",
        "Потужність обігрівачів достатня": "Потужність обігрівачів достатня.",
        "Введіть висоту стелі (більше 0).": "Введіть висоту стелі (більше 0).",
        "Введіть зовнішню температуру.": "Введіть зовнішню температуру.",
        "Введіть внутрішню температуру.": "Введіть внутрішню температуру.",
        "Введіть площу приміщення (більше 0).": "Введіть площу приміщення (більше 0).",
        "Введіть кількість зовнішніх стін (1 або більше).": "Введіть кількість зовнішніх стін (1 або більше).",
        "Введіть товщину стін (більше 0).": "Введіть товщину стін (більше 0).",
        "Введіть площу стін (більше 0).": "Введіть площу стін (більше 0).",
        "Введіть кількість вікон (1 або більше).": "Введіть кількість вікон (1 або більше).",
        "Введіть площу вікон (більше 0).": "Введіть площу вікон (більше 0).",
        "Введіть кількість дверей (0 або більше).": "Введіть кількість дверей (0 або більше).",
        "Введіть площу дверей (більше 0).": "Введіть площу дверей (більше 0).",
        "Введіть товщину стелі (більше 0).": "Введіть товщину стелі (більше 0).",
        "Тепловтрати (Вт)": "Тепловтрати (Вт)",
        "Валюта": "₴",
        "Назва валюти": "UAH",
        "Вартість електроенергії (UAH/kWh)": "Вартість електроенергії (UAH/kWh)",
        "Одиниця потужності": "Вт"
    },
    en: {
        "Калькулятор тепловтрат приміщення": "Room Heat Loss Calculator",
        "Будь ласка, введіть параметри приміщення для розрахунку тепловтрат.": "Please enter the room parameters to calculate heat loss.",
        "Оберіть мову:": "Select language:",
        "Перемкнути тему": "Toggle theme",
        "Зберегти дані": "Save data",
        "Скинути все": "Reset all",
        "Типові значення": "Typical values",
        "1. Загальна інформація": "1. General Information",
        "Тип будівлі:": "Building type:",
        "Новий багатоквартирний дім":"newApartment",
        "Висота стелі (м):": "Ceiling height (m):",
        "Зовнішня температура (°C):": "Outside temperature (°C):",
        "Внутрішня температура (°C):": "Inside temperature (°C):",
        "Площа приміщення (м²):": "Room area (m²):",
        "Тип утеплення": "Insulation type",
        "Приміщення зверху": "Upper room",
        "Приміщення знизу": "Lower room",
        "грн": "UAH",
        "€": "EUR",
        "2. Додаткова інформація": "2. Additional Information",
        "Стіни": "Walls",
        "Кількість зовнішніх стін:": "Number of external walls:",
        "Матеріал зовнішніх стін:": "External wall material:",
        "Товщина зовнішніх стін (м):": "External wall thickness (m):",
        "Сусідні приміщення:": "Adjacent rooms:",
        "Загальна площа зовнішніх стін (м²):": "Total external wall area (m²):",
        "Вікна": "Windows",
        "Кількість вікон:": "Number of windows:",
        "Площа одного вікна (м²):": "Single window area (m²):",
        "Тип вікон:": "Window type:",
        "Двері": "Doors",
        "Кількість зовнішніх/вхідних дверей:": "Number of external/entrance doors:",
        "Площа одних дверей (м²):": "Single door area (m²):",
        "Матеріал дверей:": "Door material:",
        "Стеля": "Ceiling",
        "Матеріал стелі/даху:": "Ceiling/roof material:",
        "Товщина стелі/даху (м):": "Ceiling/roof thickness (m):",
        "Підлога": "Floor",
        "Тип підлоги:": "Floor type:",
        "Вентиляція": "Ventilation",
        "Тип вентиляції:": "Ventilation type:",
        "Розрахувати тепловтрати": "Calculate heat loss",
        "Розрахунок тепловтрат": "Heat Loss Calculation",
        "Результати розрахунку:": "Calculation Results:",
        "Тепловтрати через конструкції:": "Heat loss through structures:",
        "Тепловтрати на вентиляцію:": "Ventilation heat loss:",
        "Загальні тепловтрати з вентиляцією:": "Total heat loss with ventilation:",
        "Рекомендована загальна потужність обігрівачів:": "Recommended total heater power:",
        "Обрані обігрівачі:": "Selected heaters:",
        "Приблизна вартість опалення": "Approximate heating cost",
        "Вт": "W",
        "кВт": "kW",
        "3. Вибір обігрівачів": "3. Heater Selection",
        "Оберіть обігрівачі зі списку для вашого приміщення.": "Select heaters from the list for your room.",
        "Додати власний обігрівач": "Add custom heater",
        "Автоматичний підбір": "Auto-select heaters",
        "Вартість електроенергії (грн/кВт·год):": "Electricity cost (EUR/kWh):",
        "Приблизна вартість опалення за годину:": "Estimated hourly heating cost:",
        "Приблизна вартість опалення за добу:": "Estimated daily heating cost:",
        "Приблизна вартість опалення за місяць:": "Estimated monthly heating cost:",
        "Приблизна вартість опалення за сезон (5 місяців):": "Estimated seasonal heating cost (5 months):",
        "Перевірити потужність обігрівачів": "Check heater power",
        "Надіслати розрахунок на email": "Send Calculation to Email",
        "Ваш email:": "Your email:",
        "Показати підсумок розрахунку": "Show calculation summary",
        "Завантажити PDF": "Download PDF",
        "Відправити": "Send",
        "Підсумок розрахунку тепловтрат": "Heat Loss Calculation Summary",
        "Дата та час розрахунку:": "Calculation date and time:",
        "Введені параметри": "Input Parameters",
        "Обрані обігрівачі:": "Selected Heaters:",
        "Перевірка потужності обігрівачів:": "Heater power check:",
        "Наші реквізити:": "Our Details:",
        "Назва компанії:": "Company name:",
        "Контактний номер:": "Contact number:",
        "Email:": "Email:",
        "Вебсайт:": "Website:",
        "Серія обігрівача": "Heater series",
        "Модель обігрівача": "Heater model",
        "Кількість": "Quantity",
        "Оберіть серію": "Select series",
        "Оберіть модель": "Select model",
        "Додати обігрівач": "Add heater",
        "Видалити": "Remove",
        "Введіть серію обігрівача": "Enter heater series:",
        "Введіть модель обігрівача": "Enter heater model:",
        "Введіть потужність (Вт)": "Enter power (W):",
        "Обігрівач додано": "Heater added!",
        "Некоректні дані": "Invalid data!",
        "Спочатку розрахуйте тепловтрати": "Calculate heat loss first!",
        "Оберіть обігрівачі": "Select heaters.",
        "Загальна потужність обігрівачів": "Total heater power",
        "менша за рекомендовану": "is less than recommended",
        "Потужність обігрівачів достатня": "Heater power is sufficient.",
        "Введіть висоту стелі (більше 0).": "Enter ceiling height (greater than 0).",
        "Введіть зовнішню температуру.": "Enter outside temperature.",
        "Введіть внутрішню температуру.": "Enter inside temperature.",
        "Введіть площу приміщення (більше 0).": "Enter room area (greater than 0).",
        "Введіть кількість зовнішніх стін (1 або більше).": "Enter number of external walls (1 or more).",
        "Введіть товщину стін (більше 0).": "Enter wall thickness (greater than 0).",
        "Введіть площу стін (більше 0).": "Enter wall area (greater than 0).",
        "Введіть кількість вікон (1 або більше).": "Enter number of windows (1 or more).",
        "Введіть площу вікон (більше 0).": "Enter window area (greater than 0).",
        "Введіть кількість дверей (0 або більше).": "Enter number of doors (0 or more).",
        "Введіть площу дверей (більше 0).": "Enter door area (greater than 0).",
        "Введіть товщину стелі (більше 0).": "Enter ceiling thickness (greater than 0).",
        "Тепловтрати (Вт)": "Heat Loss (W)",
        "Валюта": "€",
        "Назва валюти": "EUR",
        "Вартість електроенергії (UAH/kWh)": "Electricity cost (EUR/kWh)",
        "Одиниця потужності": "W",
        "кВт": "kW",
        "Вт": "W"
    }
};
let currentLang = "uk"; // Початкова мова

function changeLanguage() {
    const lang = document.getElementById("languageSelect").value;
    currentLang = lang;

    // 🔄 Заміна тексту у label, button тощо
    document.querySelectorAll("[data-lang-uk]").forEach((el) => {
        el.textContent = el.getAttribute(`data-lang-${lang}`);
    });

    // 🔄 Заміна placeholder
    document.querySelectorAll("[data-placeholder-uk]").forEach((el) => {
        el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
    });

    // 🔄 Заміна title
    document.querySelectorAll("[data-title-uk]").forEach((el) => {
        const newTitle = el.getAttribute(`data-title-${lang}`);
        if (newTitle) el.title = newTitle;
    });

    // 🔄 Заміна тексту в <option>
    document.querySelectorAll("option[data-lang-uk]").forEach((el) => {
        el.textContent = el.getAttribute(`data-lang-${lang}`);
    });

    // 🔄 Одиниці потужності
    document.querySelectorAll(".power-unit").forEach((el) => {
        el.textContent = translations[currentLang]["Вт"];
    });

    // 🔄 Валюта
    updateCurrencyDisplay?.();

    // 🔄 Переклад серій і моделей обігрівачів
    updateHeaterSelectLabels?.();

    //console.log("Language switched to:", currentLang);
    //console.log("translations[currentLang]['Оберіть серію'] =", translations[currentLang]["Оберіть серію"]);
}

document.getElementById("languageSelect").addEventListener("change", changeLanguage);

function saveFormData() {
    const formData = {
        buildingType: document.getElementById('buildingType').value,
        ceilingHeight: document.getElementById('ceilingHeight').value,
        outsideTemp: document.getElementById('outsideTemp').value,
        insideTemp: document.getElementById('insideTemp').value,
        roomArea: document.getElementById('roomArea').value,
        externalWallsCount: document.getElementById('externalWallsCount').value,
        wallMaterial: document.getElementById('wallMaterial').value,
        wallThickness: document.getElementById('wallThickness').value,
        adjacentRoomType: document.getElementById('adjacentRoomType').value,
        wallArea: document.getElementById('wallArea').value,
        windowCount: document.getElementById('windowCount').value,
        windowArea: document.getElementById('windowArea').value,
        windowType: document.getElementById('windowType').value,
        doorCount: document.getElementById('doorCount').value,
        doorArea: document.getElementById('doorArea').value,
        doorMaterial: document.getElementById('doorMaterial').value,
        ceilingMaterial: document.getElementById('ceilingMaterial').value,
        ceilingThickness: document.getElementById('ceilingThickness').value,
        floorType: document.getElementById('floorType').value,
        ventilationType: document.getElementById('ventilationType').value,
        electricityCost: document.getElementById('electricityCost').value
    };
    localStorage.setItem('heatLossCalculatorData', JSON.stringify(formData));
    alert(translations[currentLang]['Дані збережено'] || 'Дані збережено!');
}

function loadFormData() {
    const savedData = localStorage.getItem('heatLossCalculatorData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        Object.keys(formData).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.value = formData[key];
        });
        toggleAdjacentRoomType();
        toggleDoorFieldsVisibility();
    }
}

function resetForm() {
    document.querySelectorAll('input, select').forEach(el => {
        if (el.type === 'number') el.value = '';
        if (el.tagName === 'SELECT') el.selectedIndex = 0;
    });
    document.getElementById('ceilingHeight').value = '2.7';
    document.getElementById('externalWallsCount').value = '1';
    document.getElementById('windowCount').value = '1';
    document.getElementById('doorCount').value = '1';
    document.getElementById('result').style.display = 'none';
    document.getElementById('heaters-selection').style.display = 'none';
    document.getElementById('email-section').style.display = 'none';
    document.getElementById('calculation-summary').style.display = 'none';
    heatLossCalculated = false;
    selectedHeaters = [];
    populateHeaterSeries();
    clearErrors();
}

function fillTypicalValues() {
    document.getElementById('buildingType').value = 'newApartment';
    document.getElementById('ceilingHeight').value = '2.7';
    document.getElementById('outsideTemp').value = '-15';
    document.getElementById('insideTemp').value = '20';
    document.getElementById('roomArea').value = '50';
    document.getElementById('externalWallsCount').value = '2';
    document.getElementById('wallMaterial').value = 'brick';
    document.getElementById('wallThickness').value = '0.25';
    document.getElementById('adjacentRoomType').value = 'heated';
    document.getElementById('wallArea').value = '40';
    document.getElementById('windowCount').value = '2';
    document.getElementById('windowArea').value = '1.5';
    document.getElementById('windowType').value = 'doublePane';
    document.getElementById('doorCount').value = '1';
    document.getElementById('doorArea').value = '2';
    document.getElementById('doorMaterial').value = 'insulated';
    document.getElementById('ceilingMaterial').value = 'concrete';
    document.getElementById('ceilingThickness').value = '0.2';
    document.getElementById('floorType').value = 'concreteOnGround';
    document.getElementById('ventilationType').value = 'natural';
    toggleAdjacentRoomType();
    toggleDoorFieldsVisibility();
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

function updateCurrencyDisplay() {
    const currencySymbol = translations[currentLang]["Валюта"];
    document.querySelectorAll('.currency-symbol').forEach(element => {
        element.innerText = currencySymbol;
    });
}

function toggleDoorFieldsVisibility() {
    const doorCount = parseInt(document.getElementById('doorCount').value) || 0;
    document.getElementById('doorAreaContainer').style.display = doorCount > 0 ? 'flex' : 'none';
    document.getElementById('doorMaterialContainer').style.display = doorCount > 0 ? 'flex' : 'none';
}

function toggleAdjacentRoomType() {
    const externalWallsCount = parseInt(document.getElementById('externalWallsCount').value) || 0;
    document.getElementById('adjacentRoomTypeDiv').style.display = externalWallsCount < 4 ? 'flex' : 'none';
}

function calculateHeatLoss() {
    clearErrors();
    const validationResult = validateInputs();

    if (validationResult !== true) {
        displayErrors(validationResult);
        return;
    }

    const inputs = {
        buildingType: document.getElementById("buildingType").value,
        outsideTemp: parseFloat(document.getElementById("outsideTemp").value.replace(",", ".")),
        insideTemp: parseFloat(document.getElementById("insideTemp").value),
        roomArea: parseFloat(document.getElementById("roomArea").value),
        ceilingHeight: parseFloat(document.getElementById("ceilingHeight").value) || 2.7,
        externalWallsCount: parseInt(document.getElementById("externalWallsCount").value) || 0,
        wallArea: parseFloat(document.getElementById("wallArea").value),
        wallThickness: parseFloat(document.getElementById("wallThickness").value),
        wallMaterial: document.getElementById("wallMaterial").value,
        windowCount: parseInt(document.getElementById("windowCount").value) || 0,
        windowArea: parseFloat(document.getElementById("windowArea").value),
        windowType: document.getElementById("windowType").value,
        doorCount: parseInt(document.getElementById("doorCount").value) || 0,
        doorArea: parseFloat(document.getElementById("doorArea").value) || 0,
        doorMaterial: document.getElementById("doorMaterial").value,
        ceilingMaterial: document.getElementById("ceilingMaterial").value,
        ceilingThickness: parseFloat(document.getElementById("ceilingThickness").value),
        floorType: document.getElementById("floorType").value,
        ventilationType: document.getElementById("ventilationType").value,
        adjacentRoomType: document.getElementById("adjacentRoomType").value
    };

    const deltaT = inputs.insideTemp - inputs.outsideTemp;
    const thermalConductivity = { "brick": 0.8, "concrete": 1.4, "wood": 0.15, "insulatedBrick": 0.3 };
    const windowConductivity = { "singlePane": 5.7, "doublePane": 2.8, "triplePane": 1.8, "energyEfficient": 1.1 };
    const doorConductivity = { "wood": 2.3, "metal": 5.0, "insulated": 1.5 };
    const ceilingConductivity = { "concrete": 1.4, "insulated": 0.04 };
    const floorConductivity = { "concreteOnGround": 0.8, "concreteAboveGround": 1.5, "woodOnJoists": 0.5, "insulated": 0.3 };
    const ventilationACH = { "natural": 0.3, "forced": 0.8 };

    const wallHeatLoss = (thermalConductivity[inputs.wallMaterial] / inputs.wallThickness) * inputs.wallArea *
        (inputs.externalWallsCount === 4 ? deltaT : (inputs.adjacentRoomType === "heated" ? deltaT * 0.7 : deltaT));

    const windowHeatLoss = windowConductivity[inputs.windowType] * inputs.windowArea * inputs.windowCount * deltaT;
    const doorHeatLoss = inputs.doorCount > 0 ? doorConductivity[inputs.doorMaterial] * inputs.doorArea * inputs.doorCount * deltaT : 0;
    const ceilingHeatLoss = (ceilingConductivity[inputs.ceilingMaterial] / inputs.ceilingThickness) * inputs.roomArea * deltaT;
    const floorHeatLoss = floorConductivity[inputs.floorType] * inputs.roomArea * deltaT;

    const totalStructuralHeatLoss = wallHeatLoss + windowHeatLoss + doorHeatLoss + ceilingHeatLoss + floorHeatLoss;
    const volume = inputs.roomArea * inputs.ceilingHeight;
    const ventilationHeatLoss = 0.33 * ventilationACH[inputs.ventilationType] * volume * deltaT;
    const totalWithVentilationHeatLoss = totalStructuralHeatLoss + ventilationHeatLoss;
    const recommendedHeaterPower = totalWithVentilationHeatLoss * 1.1;

    heatLossData = {
        wallHeatLoss,
        windowHeatLoss,
        doorHeatLoss,
        ceilingHeatLoss,
        floorHeatLoss,
        totalStructuralHeatLoss,
        ventilationHeatLoss,
        totalWithVentilationHeatLoss,
        recommendedHeaterPower
    };

    document.getElementById("totalStructuralHeatLoss").innerText = totalStructuralHeatLoss.toLocaleString('uk-UA', { maximumFractionDigits: 0 }) + " Вт";
    document.getElementById("ventilationHeatLossValue").innerText = ventilationHeatLoss.toLocaleString('uk-UA', { maximumFractionDigits: 0 }) + " Вт";
    document.getElementById("totalWithVentilationHeatLossValue").innerText = totalWithVentilationHeatLoss.toLocaleString('uk-UA', { maximumFractionDigits: 0 }) + " Вт";
    document.getElementById("recommendedHeaterPowerValue").innerText = recommendedHeaterPower.toLocaleString('uk-UA', { maximumFractionDigits: 0 }) + " Вт";

    document.getElementById("result").style.display = "flex";
    document.getElementById("result").classList.add("fade-in");
    document.getElementById("heaters-selection").style.display = "block";
    document.getElementById("email-section").style.display = "block";
    heatLossCalculated = true;

    drawHeatLossChart();
    checkHeaterPower();
    //showCalculationSummary();
}

        function validateInputs() {
    const errors = {};
    const ceilingHeight = parseFloat(document.getElementById("ceilingHeight").value);
    const outsideTemp = document.getElementById("outsideTemp").value;
    const insideTemp = document.getElementById("insideTemp").value;
    const roomArea = parseFloat(document.getElementById("roomArea").value);
    const externalWallsCount = parseInt(document.getElementById("externalWallsCount").value);
    const wallThickness = parseFloat(document.getElementById("wallThickness").value);
    const wallArea = parseFloat(document.getElementById("wallArea").value);
    const windowCount = parseInt(document.getElementById("windowCount").value);
    const windowArea = parseFloat(document.getElementById("windowArea").value);
    const doorCount = parseInt(document.getElementById("doorCount").value);
    const doorArea = parseFloat(document.getElementById("doorArea").value);
    const ceilingThickness = parseFloat(document.getElementById("ceilingThickness").value);
    if (!ceilingHeight || ceilingHeight <= 0) errors.ceilingHeight = translations[currentLang]["Введіть висоту стелі (більше 0)."];
    if (!outsideTemp) errors.outsideTemp = translations[currentLang]["Введіть зовнішню температуру."];
    if (!insideTemp) errors.insideTemp = translations[currentLang]["Введіть внутрішню температуру."];
    if (!roomArea || roomArea <= 0) errors.roomArea = translations[currentLang]["Введіть площу приміщення (більше 0)."];
    if (!externalWallsCount || externalWallsCount < 1) errors.externalWallsCount = translations[currentLang]["Введіть кількість зовнішніх стін (1 або більше)."];
    if (!wallThickness || wallThickness <= 0) errors.wallThickness = translations[currentLang]["Введіть товщину стін (більше 0)."];
    if (!wallArea || wallArea <= 0) errors.wallArea = translations[currentLang]["Введіть площу стін (більше 0)."];
    if (!windowCount || windowCount < 1) errors.windowCount = translations[currentLang]["Введіть кількість вікон (1 або більше)."];
    if (!windowArea || windowArea <= 0) errors.windowArea = translations[currentLang]["Введіть площу вікон (більше 0)."];
    if (doorCount < 0) errors.doorCount = translations[currentLang]["Введіть кількість дверей (0 або більше)."];
    if (doorCount > 0 && (!doorArea || doorArea <= 0)) errors.doorArea = translations[currentLang]["Введіть площу дверей (більше 0)."];
    if (!ceilingThickness || ceilingThickness <= 0) errors.ceilingThickness = translations[currentLang]["Введіть товщину стелі (більше 0)."];
    return Object.keys(errors).length === 0 ? true : errors;
}

function displayErrors(errors) {
    clearErrors(); // Очистити попередні помилки

    let firstErrorInput = null;

    Object.keys(errors).forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;

        input.classList.add("error-input");

        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error-message");
        errorDiv.innerText = errors[id];

        input.parentElement.appendChild(errorDiv);

        if (!firstErrorInput) {
            firstErrorInput = input;
        }
    });

    if (firstErrorInput) {
        firstErrorInput.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorInput.focus();
    }
}

function clearErrors() {
    document.querySelectorAll(".error-input").forEach(input => input.classList.remove("error-input"));
    document.querySelectorAll(".error-message").forEach(div => div.remove());
}

function drawHeatLossChart() {
    const ctx = document.getElementById("heatLossChart").getContext("2d");
    if (heatLossChart) heatLossChart.destroy();
    heatLossChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                translations[currentLang]["Стіни"] || "Walls",
                translations[currentLang]["Вікна"] || "Windows",
                translations[currentLang]["Двері"] || "Doors",
                translations[currentLang]["Стеля"] || "Ceiling",
                translations[currentLang]["Підлога"] || "Floor",
                translations[currentLang]["Вентиляція"] || "Ventilation"
            ],
            datasets: [{
                label: translations[currentLang]["Тепловтрати (Вт)"] || "Heat Loss (W)",
                data: [
                    heatLossData.wallHeatLoss,
                    heatLossData.windowHeatLoss,
                    heatLossData.doorHeatLoss,
                    heatLossData.ceilingHeatLoss,
                    heatLossData.floorHeatLoss,
                    heatLossData.ventilationHeatLoss
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, title: { display: true, text: translations[currentLang]["Тепловтрати (Вт)"] || "Heat Loss (W)" } } },
            plugins: { legend: { display: false } }
        }
    });
}

function populateHeaterSeries() {
const heaterContainer = document.getElementById('heaters-container');
heaterContainer.innerHTML = '';
addHeaterSelect(1);
}

function addHeaterSelect(index) {
    const lang = currentLang;
    const heaterContainer = document.getElementById('heaters-container');
    const div = document.createElement('div');
    div.classList.add('heater-select');

    div.innerHTML = `
        <label for="heaterSeries${index}">${translations[lang]['Серія обігрівача']} ${index}:</label>
        <select id="heaterSeries${index}" onchange="populateHeaterModels(${index})">
            <option value="">${translations[lang]['Оберіть серію']}</option>
            ${Object.keys(heaterModelsData).map(series => 
                `<option value="${series}">${heaterModelsData[series].name[lang]}</option>`
            ).join('')}
        </select>

        <label for="heaterModel${index}">${translations[lang]['Модель обігрівача']} ${index}:</label>
        <select id="heaterModel${index}">
            <option value="">${translations[lang]['Оберіть модель']}</option>
        </select>

        <label for="heaterQuantity${index}">${translations[lang]['Кількість']}:</label>
        <input type="number" id="heaterQuantity${index}" value="1" min="1">

        <button type="button" onclick="addHeater()">${translations[lang]['Додати обігрівач']}</button>
        ${index > 1 ? `<button class="remove-heater" onclick="removeHeater(this)">${translations[lang]['Видалити']}</button>` : ''}
    `;

    heaterContainer.appendChild(div);
}

function updateHeaterSelectLabels() {
    const lang = currentLang;
    const heaterBlocks = document.querySelectorAll('.heater-select');

    heaterBlocks.forEach((block, index) => {
        const i = index + 1;

        const seriesSelect = block.querySelector(`#heaterSeries${i}`);
        const modelSelect = block.querySelector(`#heaterModel${i}`);
        const quantityInput = block.querySelector(`#heaterQuantity${i}`);
        const labelSeries = block.querySelector(`label[for="heaterSeries${i}"]`);
        const labelModel = block.querySelector(`label[for="heaterModel${i}"]`);
        const labelQuantity = block.querySelector(`label[for="heaterQuantity${i}"]`);
        const addButton = block.querySelector(`button[onclick="addHeater()"]`);
        const removeButton = block.querySelector(`.remove-heater`);

        if (labelSeries) labelSeries.textContent = `${translations[lang]['Серія обігрівача']} ${i}:`;
        if (labelModel) labelModel.textContent = `${translations[lang]['Модель обігрівача']} ${i}:`;
        if (labelQuantity) labelQuantity.textContent = `${translations[lang]['Кількість']}:`;
        if (addButton) addButton.textContent = translations[lang]['Додати обігрівач'];
        if (removeButton) removeButton.textContent = translations[lang]['Видалити'];

        // 🔁 Оновлюємо серії
        if (seriesSelect) {
            const selectedSeries = seriesSelect.value;
            seriesSelect.innerHTML = `<option value="">${translations[lang]['Оберіть серію']}</option>`;
            Object.keys(heaterModelsData).forEach(series => {
                const option = document.createElement('option');
                option.value = series;
                option.textContent = heaterModelsData[series].name[lang];
                if (series === selectedSeries) option.selected = true;
                seriesSelect.appendChild(option);
            });
        }

        // 🔁 Оновлюємо моделі
        if (modelSelect && seriesSelect) {
            const selectedModel = modelSelect.value;
            modelSelect.innerHTML = `<option value="">${translations[lang]['Оберіть модель']}</option>`;
            const seriesKey = seriesSelect.value;
            if (heaterModelsData[seriesKey]) {
                heaterModelsData[seriesKey].models.forEach(model => {
                    const option = document.createElement('option');
                    const modelStr = JSON.stringify(model);
                    option.value = modelStr;
                    option.textContent = `${model.model[lang]} (${model.power} ${translations[lang]['Вт']})`;
                    if (modelStr === selectedModel) option.selected = true;
                    modelSelect.appendChild(option);
                });
            }
        }
    });
}

function populateHeaterModels(index) {
const series = document.getElementById(`heaterSeries${index}`).value;
const modelSelect = document.getElementById(`heaterModel${index}`);
modelSelect.innerHTML = `<option value="">${translations[currentLang]['Оберіть модель']}</option>`;
if (heaterModelsData[series]) {
heaterModelsData[series].models.forEach(model => {
    const option = document.createElement('option');
    option.value = JSON.stringify(model);
    option.innerText = `${model.model[currentLang]} (${model.power} Вт)`;
    modelSelect.appendChild(option);
});
}
}

function addHeater() {
    const heaterContainer = document.getElementById('heaters-container');
    addHeaterSelect(heaterContainer.children.length + 1);
}

function removeHeater(button) {
    button.parentElement.remove();
}

function addCustomHeater() {
const seriesKey = prompt(translations[currentLang]['Введіть серію обігрівача']);
const seriesNameUk = prompt(translations[currentLang]['Введіть назву серії (українською)']);
const seriesNameEn = prompt(translations[currentLang]['Введіть назву серії (англійською)']);
const modelUk = prompt(translations[currentLang]['Введіть модель обігрівача (українською)']);
const modelEn = prompt(translations[currentLang]['Введіть модель обігрівача (англійською)']);
const power = parseInt(prompt(translations[currentLang]['Введіть потужність (Вт)']));
if (seriesKey && seriesNameUk && seriesNameEn && modelUk && modelEn && power > 0) {
if (!heaterModelsData[seriesKey]) {
    heaterModelsData[seriesKey] = { "name": {"uk": seriesNameUk, "en": seriesNameEn}, "models": [] };
}
heaterModelsData[seriesKey].models.push({ "model": {"uk": modelUk, "en": modelEn}, "power": power, "priceUAH": 0, "priceEUR": 0 });
populateHeaterSeries();
alert(translations[currentLang]['Обігрівач додано']);
} else {
alert(translations[currentLang]['Некоректні дані']);
}
}

function autoSelectHeaters() {
if (!heatLossCalculated) {
alert(translations[currentLang]['Спочатку розрахуйте тепловтрати']);
return;
}
const recommendedPower = parseFloat(document.getElementById('recommendedHeaterPowerValue').innerText.replace(/\s/g, '')) || 0;
selectedHeaters = [];
let remainingPower = recommendedPower;
const flatHeaters = Object.keys(heaterModelsData).flatMap(series => heaterModelsData[series].models.map(model => ({ series, model })));
flatHeaters.sort((a, b) => b.model.power - a.model.power);
flatHeaters.forEach(heater => {
if (remainingPower > 0) {
    const quantity = Math.ceil(remainingPower / heater.model.power);
    if (quantity > 0) {
        selectedHeaters.push({ series: heater.series, model: heater.model, quantity });
        remainingPower -= quantity * heater.model.power;
    }
}
});
const heaterContainer = document.getElementById('heaters-container');
heaterContainer.innerHTML = '';
selectedHeaters.forEach((heater, index) => {
addHeaterSelect(index + 1);
document.getElementById(`heaterSeries${index + 1}`).value = heater.series;
populateHeaterModels(index + 1);
document.getElementById(`heaterModel${index + 1}`).value = JSON.stringify(heater.model);
document.getElementById(`heaterQuantity${index + 1}`).value = heater.quantity;
});
checkHeaterPower();
}

function getSelectedHeatersData() {
    selectedHeaters = [];
    document.querySelectorAll('.heater-select').forEach(div => {
        const series = div.querySelector('select[id^="heaterSeries"]').value;
        const model = div.querySelector('select[id^="heaterModel"]').value;
        const quantity = parseInt(div.querySelector('input[id^="heaterQuantity"]').value);
        if (series && model && quantity) {
            selectedHeaters.push({ series, model: JSON.parse(model), quantity });
        }
    });
    return selectedHeaters;
}

function checkHeaterPower() {
    const selectedHeaters = getSelectedHeatersData();
    let totalHeaterPower = selectedHeaters.reduce((sum, heater) => sum + heater.model.power * heater.quantity, 0);
    const recommendedPower = parseFloat(document.getElementById('recommendedHeaterPowerValue').innerText.replace(/\s/g, '')) || 0;
    const result = document.getElementById('heaterCheckResult');
    result.classList.remove('error-text', 'success-text');
    result.innerText = '';
    if (!heatLossCalculated) {
        result.innerText = translations[currentLang]['Спочатку розрахуйте тепловтрати'];
    } else if (selectedHeaters.length === 0) {
        result.innerText = translations[currentLang]['Оберіть обігрівачі'];
        result.classList.add('error-text');
    } else if (totalHeaterPower < recommendedPower) {
        result.innerText = `${translations[currentLang]['Загальна потужність обігрівачів']} (${totalHeaterPower.toLocaleString('uk-UA')} Вт) ${translations[currentLang]['менша за рекомендовану']} (${recommendedPower.toLocaleString('uk-UA')} Вт).`;
        result.classList.add('error-text');
    } else {
        result.innerText = translations[currentLang]['Потужність обігрівачів достатня'];
        result.classList.add('success-text');
    }
    calculateHeatingCost();
}
// Функця подсчета теплопотерь
function calculateHeatingCost() {
    const totalHeaterPowerWatts = selectedHeaters.reduce((sum, heater) => sum + heater.model.power * heater.quantity, 0);
    const totalHeaterPowerkW = totalHeaterPowerWatts / 1000;
    const costPerKWh = parseFloat(document.getElementById('electricityCost').value) || 0;
    const hourlyConsumptionkW = totalHeaterPowerkW * 0.2;
    const hourlyCost = hourlyConsumptionkW * costPerKWh;
    const dailyConsumptionkW = hourlyConsumptionkW * 24;
    const dailyCost = dailyConsumptionkW * costPerKWh;
    const monthlyConsumptionkW = dailyConsumptionkW * 30 * 0.8;
    const monthlyCost = monthlyConsumptionkW * costPerKWh;
    const seasonalConsumptionkW = monthlyConsumptionkW * 5;
    const seasonalCost = seasonalConsumptionkW * costPerKWh;
    document.getElementById('heatingCostHourly').innerText = hourlyCost ? hourlyCost.toFixed(2) : '0.00';
    document.getElementById('heatingCostDaily').innerText = dailyCost ? dailyCost.toFixed(2) : '0.00';
    document.getElementById('heatingCostMonthly').innerText = monthlyCost ? monthlyCost.toFixed(2) : '0.00';
    document.getElementById('heatingCostSeasonal').innerText = seasonalCost ? seasonalCost.toFixed(2) : '0.00';
}

function showCalculationSummary() {
    if (!heatLossData.recommendedHeaterPower) {
        alert("Спочатку розрахуйте тепловтрати.");
        return;
    }

    const powerUnit = currentLang === "uk" ? "Вт" : "W";
    const totalPowerUnit = currentLang === "uk" ? "кВт" : "kW";

    document.getElementById("summary-datetime").innerText =
        new Date().toLocaleString(currentLang === "uk" ? "uk-UA" : "en-US");

    const fields = [
        ["summary-buildingType", "buildingType"],
        ["summary-ceilingHeight", "ceilingHeight"],
        ["summary-outsideTemp", "outsideTemp"],
        ["summary-insideTemp", "insideTemp"],
        ["summary-roomArea", "roomArea"],
        ["summary-externalWallsCount", "externalWallsCount"],
        ["summary-wallThickness", "wallThickness"],
        ["summary-wallArea", "wallArea"],
        ["summary-windowCount", "windowCount"],
        ["summary-windowSingleArea", "windowArea"],
        ["summary-doorCount", "doorCount"],
        ["summary-doorSingleArea", "doorArea"],
        ["summary-ceilingThickness", "ceilingThickness"]
    ];

    fields.forEach(([summaryId, inputId]) => {
        const value = document.getElementById(inputId)?.value || "";
        document.getElementById(summaryId).innerText = value;
    });

    document.getElementById("summary-wallMaterial").innerText = document.getElementById("wallMaterial").selectedOptions[0].text;
    document.getElementById("summary-windowType").innerText = document.getElementById("windowType").selectedOptions[0].text;
    document.getElementById("summary-doorMaterial").innerText = document.getElementById("doorMaterial").selectedOptions[0].text;
    document.getElementById("summary-ceilingMaterial").innerText = document.getElementById("ceilingMaterial").selectedOptions[0].text;
    document.getElementById("summary-floorType").innerText = document.getElementById("floorType").selectedOptions[0].text;
    document.getElementById("summary-ventilationType").innerText = document.getElementById("ventilationType").selectedOptions[0].text;

    const walls = parseInt(document.getElementById("externalWallsCount").value);
    const adjacentRoom = document.getElementById("adjacentRoomType");
    const row = document.getElementById("summary-adjacentRoomType-row");
    if (walls < 4 && adjacentRoom) {
        row.style.display = "block";
        document.getElementById("summary-adjacentRoomType").innerText = adjacentRoom.selectedOptions[0].text;
    } else {
        row.style.display = "none";
    }

    // Виведемо тепловтрати та потужність
    document.getElementById("summary-totalStructuralHeatLoss").innerHTML =
        `${heatLossData.totalStructuralHeatLoss.toLocaleString()} <span class="power-unit">${powerUnit}</span>`;
    document.getElementById("summary-ventilationHeatLossValue").innerHTML =
        `${heatLossData.ventilationHeatLoss.toLocaleString()} <span class="power-unit">${powerUnit}</span>`;
    document.getElementById("summary-totalWithVentilationHeatLossValue").innerHTML =
        `${heatLossData.totalWithVentilationHeatLoss.toLocaleString()} <span class="power-unit">${powerUnit}</span>`;
    document.getElementById("summary-recommendedHeaterPowerValue").innerHTML =
        `${heatLossData.recommendedHeaterPower.toLocaleString()} <span class="power-unit">${powerUnit}</span>`;

    // 🔥 HEATERS
    const heatersList = document.getElementById("summary-heaters-list");
    const heatersTable = document.getElementById("summary-heaters-table");
    const heaterMessage = document.getElementById("no-heaters-message");
    const powerMessage = document.getElementById("summary-heater-power-message");
    const totalHeaterPower = selectedHeaters.reduce((sum, h) => sum + h.model.power * h.quantity, 0);

    heatersList.innerHTML = "";
    powerMessage.innerText = "";
    powerMessage.classList.remove("error-text", "success-text");

    if (selectedHeaters.length === 0) {
        heatersTable.style.display = "none";
        heaterMessage.style.display = "block";
    } else {
        heatersTable.style.display = "table";
        heaterMessage.style.display = "none";

        selectedHeaters.forEach(h => {
            const tr = document.createElement("tr");
            const totalPower = (h.model.power * h.quantity) / 1000;
            const price = currentLang === "uk" ? h.model.priceUAH : h.model.priceEUR;
            const totalPrice = price * h.quantity;

            tr.innerHTML = `
    <td data-label="${translations[currentLang]["Модель"]}">${heaterModelsData[h.series].name[currentLang]} ${h.model.model[currentLang]}</td>
    <td data-label="${translations[currentLang]["К-сть"]}">${h.quantity}</td>
    <td data-label="${translations[currentLang]["Потужність (Вт)"]}">${h.model.power} ${powerUnit}</td>
    <td data-label="${translations[currentLang]["Потужність (кВт)"]}">${totalPower.toFixed(2)} ${totalPowerUnit}</td>
    <td data-label="${translations[currentLang]["Ціна (за 1)"]}">${price} ${translations[currentLang]["Валюта"]}</td>
    <td data-label="${translations[currentLang]["Загальна ціна"]}">${totalPrice.toFixed(2)} ${translations[currentLang]["Валюта"]}</td>
`;
            heatersList.appendChild(tr);
        });

        if (totalHeaterPower < heatLossData.recommendedHeaterPower) {
            powerMessage.innerText = `${translations[currentLang]["Загальна потужність обігрівачів"]} (${(totalHeaterPower / 1000).toFixed(2)} ${totalPowerUnit}) ${translations[currentLang]["менша за рекомендовану"]} (${(heatLossData.recommendedHeaterPower / 1000).toFixed(2)} ${totalPowerUnit})`;
            powerMessage.classList.add("error-text");
        } else {
            powerMessage.innerText = translations[currentLang]["Потужність обігрівачів достатня"];
            powerMessage.classList.add("success-text");
        }
    }

    // 💸 COST
    const cost = parseFloat(document.getElementById("electricityCost").value);
    const costWarning = document.getElementById("summary-electricity-warning");

    const costFields = [
        "summary-electricityCost",
        "summary-heatingCostHourly",
        "summary-heatingCostDaily",
        "summary-heatingCostMonthly",
        "summary-heatingCostSeasonal"
    ];

    costFields.forEach(id => {
        const value = document.getElementById(id.replace("summary-", "")).innerText || "0.00";
        document.getElementById(id).innerText = value;
    });

    costWarning.style.display = !cost || cost <= 0 ? "block" : "none";
    document.getElementById("calculation-summary").classList.add("active");
}


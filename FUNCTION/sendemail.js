function sendCalculationEmail() {
    const lang = currentLang;
    const powerUnit = translations[lang]["Вт"];
    const currencyUnit = translations[lang]["грн"];

    const subject = translations[lang]["Підсумок розрахунку тепловтрат"] || "Calculation Summary";
    const body = `
        ${translations[lang]["Тепловтрати через конструкції:"]} ${document.getElementById("summary-totalStructuralHeatLoss").innerText || "0"} ${powerUnit}
        ${translations[lang]["Тепловтрати на вентиляцію:"]} ${document.getElementById("summary-ventilationHeatLossValue").innerText || "0"} ${powerUnit}
        ${translations[lang]["Загальні тепловтрати з вентиляцією:"]} ${document.getElementById("summary-totalWithVentilationHeatLossValue").innerText || "0"} ${powerUnit}
        ${translations[lang]["Рекомендована загальна потужність обігрівачів:"]} ${document.getElementById("summary-recommendedHeaterPowerValue").innerText || "0"} ${powerUnit}
    `;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
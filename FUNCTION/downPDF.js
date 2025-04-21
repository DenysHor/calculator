function downloadPDF() {
    const lang = document.getElementById("languageSelect").value;
    const powerUnit = translations[lang]["Вт"]; // "Вт" або "W"

    const docDefinition = {
        content: [
            {
                text: translations[lang]["Підсумок розрахунку тепловтрат"] || "Calculation Summary",
                style: "header"
            },
            {
                table: {
                    widths: ["50%", "50%"],
                    body: [
                        [
                            translations[lang]["Параметр"] || "Parameter",
                            translations[lang]["Значення"] || "Value"
                        ],
                        [
                            translations[lang]["Тепловтрати через конструкції:"] || "Heat loss through structures:",
                            `${document.getElementById("summary-totalStructuralHeatLoss").innerText || "0"} ${powerUnit}`
                        ],
                        [
                            translations[lang]["Тепловтрати на вентиляцію:"] || "Ventilation heat loss:",
                            `${document.getElementById("summary-ventilationHeatLossValue").innerText || "0"} ${powerUnit}`
                        ],
                        [
                            translations[lang]["Загальні тепловтрати з вентиляцією:"] || "Total heat loss with ventilation:",
                            `${document.getElementById("summary-totalWithVentilationHeatLossValue").innerText || "0"} ${powerUnit}`
                        ],
                        [
                            translations[lang]["Рекомендована загальна потужність обігрівачів:"] || "Recommended total heater power:",
                            `${document.getElementById("summary-recommendedHeaterPowerValue").innerText || "0"} ${powerUnit}`
                        ]
                    ]
                }
            }
        ],
        styles: {
            header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
        }
    };

    pdfMake.createPdf(docDefinition).download(`HeatLossCalculation_${new Date().toISOString().split('T')[0]}.pdf`);
}
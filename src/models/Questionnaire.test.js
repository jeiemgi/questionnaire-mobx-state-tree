import { products, QuestionnaireStore, QuestionnaireItem } from "./QuestionnaireStore"
import { reaction } from 'mobx';

describe("QuestionnaireItem", () => {
    it("can create an item", () => {
        const item = QuestionnaireItem.create({
            title: "Tu fecha de nacimiento",
            type: "date",
        });
        expect(item.title).toBe("Tu fecha de nacimiento");
        expect(item.type).toBe("date");
    });
    it("can change the title of a QuestionnaireItem", () => {
        const item = QuestionnaireItem.create({
            title: "Tu fecha de nacimiento",
            type: "date"
        });
        item.changeTitle("Fecha de nacimiento");
        expect(item.title).toBe("Fecha de nacimiento");
    });
});

describe("Questionnaire", () => {
    it('can add items',  () => {
        const questionnaire = QuestionnaireStore.create({
            title: "healthQuestionnaire",
            items: []
        });
        const questionnaireItem = QuestionnaireItem.create({
            title: "Fecha de nacimiento",
            type: "date"
        });
        questionnaire.add(questionnaireItem);
        questionnaire.items[0].changeTitle("Tu fecha de nacimiento");

        expect(questionnaire.items.length).toBe(1);
        expect(questionnaire.items[0].title).toBe("Tu fecha de nacimiento");
    });
    it('can compute only covid items',  () => {
        const questionnaire = QuestionnaireStore.create({
            title: "healthQuestionnaire",
            items: [
                {
                    title: "Fecha de nacimiento",
                    type: "date",
                    product: products.covid
                },
                {
                    title: "Fecha de nacimiento",
                    type: "date",
                    product: products.covid
                },
                {
                    title: "Fecha de nacimiento",
                    type: "date",
                    product: products.insurance
                }
            ]
        });

        let changed = 0;

        reaction(() => questionnaire.covidItems, () => changed++);
        questionnaire.items[0].changeTitle("New title");
        expect(changed).toBe(0);

        questionnaire.items[0].changeProduct(products.insurance);
        expect(changed).toBe(1);

        questionnaire.items[0].changeProduct(products.insurance);
        expect(changed).toBe(1);

        questionnaire.items[1].changeProduct(products.insurance);
        expect(changed).toBe(2);
    });
});

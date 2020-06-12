import { types, destroy, getParent } from 'mobx-state-tree';


export const products = {
    insurance: "2",
    covid: "3",
};

export const QuestionnaireItem = types
.model({
    title: types.string,
    type: types.string,
    value: types.optional(types.string, ""),
    product: types.optional(types.string, "")
}).actions((self) => ({
    changeTitle(newTitle) {
        self.title = newTitle;
    },
    changeProduct(newProduct) {
        self.product = newProduct;
    },
    changeValue(newValue) {
        self.value = newValue;
    },
    remove() {
        getParent(self, 2).remove(self)
    }
}));

export const QuestionnaireStore = types
    .model({
        title: types.string,
        items: types.array(QuestionnaireItem)
    })
    .actions((self) => ({
        add(item) {
            self.items.push(item)
        },
        remove(item) {
            destroy(item)
        }
    }))
    .views(self => ({
        get covidItems() {
            return self.items.filter(item => item.product === products.covid)
        }
    }))
;

import { setCookie } from '../../src/utils/cookie';

beforeEach(() => {
    setCookie('accessToken', 'FAKE_Token');

    //перехватывае запрос
    cy.intercept('GET', '*/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredietns');

    //моковые данные ответа на запрос данных пользователя.
    cy.intercept('GET', '*/auth/user', { fixture: 'checkUser.json' }).as('getUser');

    //моковые данные ответа на запрос создания заказа.
    cy.intercept('POST', '*/orders', { fixture: 'order.json' }).as('postOrder');

    //вызываем запрос, у меня он вызывается при рендере
    cy.visit('/');
});

describe('TEST 1', () => {

    it('Добавление ингредиента в конструктор', () => {
        //счетчик для добавленных ингредиентов
        let i = 0;

        //Ищем булку
        // Фильтруем элементы по текстовому содержимому
        cy.contains('[data-testid="listCard"]', 'Краторная булка N-200i')
            // Входим в каждый отфильтрованный элемент
            .within(() => {
                // Находим и кликаем на кнопку внутри этого элемента
                cy.get('button').click();

                i = i + 1;
            });

        //добавляем начинку
        cy.contains('[data-testid="listCard"]', 'Биокотлета из марсианской Магнолии')
            .within(() => {
                cy.get('button').click();
                i = i + 1;
            });


        //добавляем начинку
        cy.contains('[data-testid="listCard"]', 'Биокотлета из марсианской Магнолии')
            .within(() => {
                cy.get('button').click();
                i = i + 1;
            });

        // Проверяем количество добавленных ингредиентов
        cy.get('[data-testid="constructorItems"]').find('.constructor-element').should(($elements) => {
            // Проверяем, что количество элементов соответствует значению переменной i + 1
            expect($elements).to.have.length(i + 1);
        });


    });
});

describe('TEST 2', () => {
    beforeEach(() => {
        //Кликаем по ингредиенту
        cy.contains('[data-testid="listCard"]', 'Краторная булка N-200i').click();
    });

    it('Открытие модального окна при клике на ингредиенте', () => {
        cy.get('[data-testid="modal"]').should('exist');
    });

    it('Закрытие модального окна по крестику', () => {
        //ищем крестик и кликаем 
        cy.get('[data-testid="modal"]').find('svg').click();
        //Проверяем, что модальное окно больше не существует
        cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('Закрытие модального окна по оверлею', () => {
        //ищем оверлей и кликаем
        //модалка перекрыта изображение используем force
        cy.get('[data-testid="modalOverlay"]').click({ force: true });

        //Проверяем, что модальное окно больше не существует
        cy.get('[data-testid="modal"]').should('not.exist');
    });

});

describe('TEST 3', () => {
    it('Оформляем заказ', () => {
        //Ищем булку
        // Фильтруем элементы по текстовому содержимому
        cy.contains('[data-testid="listCard"]', 'Краторная булка N-200i')
            // Входим в каждый отфильтрованный элемент
            .within(() => {
                // Находим и кликаем на кнопку внутри этого элемента
                cy.get('button').click();

            });

        //добавляем начинку
        cy.contains('[data-testid="listCard"]', 'Биокотлета из марсианской Магнолии')
            .within(() => {
                cy.get('button').click();
            });

        cy.contains('Оформить заказ').click();

        cy.get('[data-testid="modal"]').should('exist');

        //Ищем номер заказа, проверяем что он соответствует фейковому номеру
        cy.contains('666666').should('have.text', '666666');

        //ищем крестик и кликаем 
        cy.get('[data-testid="modal"]').find('svg').click();

        //Проверяем, что модальное окно больше не существует
        cy.get('[data-testid="modal"]').should('not.exist');

        //проверяем что не содержит потомком 
        cy.get('[data-testid="constructorItems"]').should('not.contain', '.constructor-element');
    })
})
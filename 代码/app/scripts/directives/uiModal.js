'use strict';

module.exports = [
    function () {
        return {
            restrict: 'E',
            scope: {
                modal: '='
            },
            template: '\
                <div class="modal" data-ng-class="{\'modal-in\': modal.showModal}"> \n\
                    <div class="modal-inner"> \n\
                        <div class="modal-title">{{modal.title}}</div> \n\
                        <div class="modal-text">{{modal.text}}</div> \n\
                    </div> \n\
                    <div class="modal-line"></div> \n\
                    <div class="modal-buttons"> \n\
                        <span class="modal-button" data-ng-show="modal.cancleBtn">{{modal.cancleBtn}}</span> \n\
                        <span class="modal-button modal-button-bold" data-ng-click="modal.confirm()">{{modal.confirmBtn}}</span> \n\
                    </div> \n\
                </div> \n\
                <div class="modal-overlay" data-ng-class="{\'modal-overlay-visible\': modal.showModal}"></div>',
            link: function (scope, element) {
                var modalButton = element.find('span');
                modalButton.bind('click', function () {
                    scope.$apply(function () {
                        scope.modal.showModal = false;
                    });
                });
            }
        }
    }
];

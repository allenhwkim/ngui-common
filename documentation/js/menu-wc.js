'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@ngui/common-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/NguiCommonModule.html" data-type="entity-link">NguiCommonModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NguiInviewModule.html" data-type="entity-link">NguiInviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NguiInviewModule-0e40755c2e842f790c160ca6e691576e"' : 'data-target="#xs-components-links-module-NguiInviewModule-0e40755c2e842f790c160ca6e691576e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NguiInviewModule-0e40755c2e842f790c160ca6e691576e"' :
                                            'id="xs-components-links-module-NguiInviewModule-0e40755c2e842f790c160ca6e691576e"' }>
                                            <li class="link">
                                                <a href="components/NguiInviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NguiInviewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NguiInviewModule-0e40755c2e842f790c160ca6e691576e"' : 'data-target="#xs-directives-links-module-NguiInviewModule-0e40755c2e842f790c160ca6e691576e"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NguiInviewModule-0e40755c2e842f790c160ca6e691576e"' :
                                        'id="xs-directives-links-module-NguiInviewModule-0e40755c2e842f790c160ca6e691576e"' }>
                                        <li class="link">
                                            <a href="directives/NguiInviewDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NguiInviewDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NguiListModule.html" data-type="entity-link">NguiListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NguiListModule-c6651439f955e940ad915bb103e71fd0"' : 'data-target="#xs-components-links-module-NguiListModule-c6651439f955e940ad915bb103e71fd0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NguiListModule-c6651439f955e940ad915bb103e71fd0"' :
                                            'id="xs-components-links-module-NguiListModule-c6651439f955e940ad915bb103e71fd0"' }>
                                            <li class="link">
                                                <a href="components/NguiAutocompleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NguiAutocompleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NguiInviewPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NguiInviewPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NguiVirtualListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NguiVirtualListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NguiListModule-c6651439f955e940ad915bb103e71fd0"' : 'data-target="#xs-directives-links-module-NguiListModule-c6651439f955e940ad915bb103e71fd0"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NguiListModule-c6651439f955e940ad915bb103e71fd0"' :
                                        'id="xs-directives-links-module-NguiListModule-c6651439f955e940ad915bb103e71fd0"' }>
                                        <li class="link">
                                            <a href="directives/NguiListDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NguiListDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NguiListItemDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NguiListItemDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NguiUtilsModule.html" data-type="entity-link">NguiUtilsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NguiUtilsModule-ef6cd7af1d5ccb0d7b821527ade9ffb7"' : 'data-target="#xs-injectables-links-module-NguiUtilsModule-ef6cd7af1d5ccb0d7b821527ade9ffb7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NguiUtilsModule-ef6cd7af1d5ccb0d7b821527ade9ffb7"' :
                                        'id="xs-injectables-links-module-NguiUtilsModule-ef6cd7af1d5ccb0d7b821527ade9ffb7"' }>
                                        <li class="link">
                                            <a href="injectables/DynamicComponentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DynamicComponentService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-NguiUtilsModule-ef6cd7af1d5ccb0d7b821527ade9ffb7"' : 'data-target="#xs-pipes-links-module-NguiUtilsModule-ef6cd7af1d5ccb0d7b821527ade9ffb7"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-NguiUtilsModule-ef6cd7af1d5ccb0d7b821527ade9ffb7"' :
                                            'id="xs-pipes-links-module-NguiUtilsModule-ef6cd7af1d5ccb0d7b821527ade9ffb7"' }>
                                            <li class="link">
                                                <a href="pipes/NguiHighlightPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NguiHighlightPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/konsole.html" data-type="entity-link">konsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoMatchFound.html" data-type="entity-link">NoMatchFound</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoneSelect.html" data-type="entity-link">NoneSelect</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DynamicComponentService.html" data-type="entity-link">DynamicComponentService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
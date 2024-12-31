const _DEBUG = false;

const wikiLinkPattern = /https?:\/\/\w*\.?wikipedia/i;
let bannedWikiLinksCount = 0;
const yandexSearchResultCardSelector = 'li.serp-item_card';
const yandexPathElementSelector = 'div.Path';
const yandexWikiButtonSelector = "div.entity-search__wiki-button";

const topYBrowserAdvertisingClass = 'Distribution';
const aliceButtonId = 'alice-fab';
const aliceButtonClass = 'alice-fab';

const rightPartId= 'search-result-aside'

const redBorder = el =>  el.style.border = "3px dotted red";

const removeElement = el => el.style.display = "none";

const banAction = el => {
    _DEBUG && redBorder(el) ||  removeElement(el);
    bannedWikiLinksCount++;
};

const informAboutResult = () => console.log(`YANDEXWIKIBAN: Banned ${bannedWikiLinksCount} wikipedia links`);

const getYandexSearchResults = () => document.querySelectorAll(yandexSearchResultCardSelector);

const getYandexPathElement = el => el.querySelector(yandexPathElementSelector);

const filterLink = el => el.nodeName == 'A' && el.hasAttribute('href') && wikiLinkPattern.test(el.getAttribute('href'));

const iterateElementsList = (list, filter, action) => {
    [... list].filter(filter).map(action);
}

const iterateYandexResultList = el => {
    const pathElement = getYandexPathElement(el);
    if (pathElement) iterateElementsList(pathElement.children, filterLink, (e) => banAction(el));
}

const removeFromYandexSearchResults = () => {
    iterateElementsList(getYandexSearchResults(), _ => true, iterateYandexResultList);
};

const getYandexWikiButtons = () => document.querySelectorAll(yandexWikiButtonSelector);
const removeYandexWikiButtons = () => iterateElementsList(getYandexWikiButtons(), _ => true, (el) => banAction(el));

const getYandexAllLinks = () => document.querySelectorAll("a");
const removeYandexWikiLinks = () => iterateElementsList(getYandexAllLinks(), filterLink, (el) => banAction(el));

const getDistributions = () => document.querySelectorAll(`.${topYBrowserAdvertisingClass}`);
const removeDistribution =  () => iterateElementsList(getDistributions(), _ => true, (el) => banAction(el));
const removeAliceButton = () => removeElement( document.getElementById(aliceButtonId) );
const removeAliceButton2 = () =>  iterateElementsList(document.getElementsByClassName(aliceButtonClass), _ => true, (el) => banAction(el));
const removeRightPart = () => removeElement( document.getElementById(rightPartId));

removeFromYandexSearchResults();
removeYandexWikiButtons();
removeYandexWikiLinks();
removeDistribution();
removeAliceButton();
removeAliceButton2();
removeRightPart();

informAboutResult();
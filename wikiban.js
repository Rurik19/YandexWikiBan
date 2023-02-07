const _DEBUG = false;

const wikiLinkPattern = /https?:\/\/\w*\.?wikipedia/i;
let bannedWikiLinksCount = 0;
const yandexSearchResultCardSelector = 'li.serp-item_card';
const yandexPathElementSelector = 'div.Path';
const yandexWikiButtonSelector = "div.entity-search__wiki-button";

const redBorder = el =>  el.style.border = "3px dotted red";

const removeElement = el => el.remove();

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

removeFromYandexSearchResults();
removeYandexWikiButtons();
removeYandexWikiLinks();

informAboutResult();
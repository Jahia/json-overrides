import {registry} from '@jahia/ui-extender';
import i18next from 'i18next';

export default function () {
    i18next.loadNamespaces('json-overrides');

    registry.add('callback', 'estates', {
        targets: ['jahiaApp-init:60'],
        callback: function () {
            const sql2Search = window.jahia.uiExtender.registry.get('accordionItem', 'sql2Search');
            const contentFolders = window.jahia.uiExtender.registry.get('accordionItem', 'content-folders');
            window.jahia.uiExtender.registry.add('accordionItem', 'estates', contentFolders, sql2Search, {
                targets: ['jcontent:998'],
                label: 'All Estates Listed',
                icon: window.jahia.moonstone.toIconComponent('<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6V5A2 2 0 0 0 17 3H15A2 2 0 0 0 13 5V6H11V5A2 2 0 0 0 9 3H7A2 2 0 0 0 5 5V6H3V20H21V6M19 18H5V8H19Z" /></svg>'),
                requireModuleInstalledOnSite: 'json-overrides',
                isEnabled: function (siteKey) {
                    return siteKey !== 'systemsite';
                },
                rootPath: '/',
                treeConfig: {
                    hideRoot: true,
                    selectableTypes: ['luxe:estate'],
                    openableTypes: [],
                    rootLabel: 'Estates',
                    sortBy: window.jahia.jcontent.SORT_CONTENT_TREE_BY_NAME_ASC
                },
                tableConfig: {
                    queryHandler: {
                        ...window.jahia.jcontent.Sql2SearchQueryHandler,
                        getQueryVariables: p => ({
                            ...window.jahia.jcontent.Sql2SearchQueryHandler.getQueryVariables(p),
                            query: `SELECT * FROM ['luxe:estate'] WHERE ISDESCENDANTNODE('/sites/${p.siteKey}/contents')`
                        })
                    },
                    typeFilter: ['luxe:estate']
                }
            });
        }
    });
}

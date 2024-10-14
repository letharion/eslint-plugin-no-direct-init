const create = (context) => {
    const forbiddenClasses = context.options[0] || [];
    if (!Array.isArray(forbiddenClasses) || forbiddenClasses.length === 0) {
        throw new Error(
            "The 'no-direct-init' rule requires at least one class to be forbidden. Please configure the rule properly."
        );
    }

    const lazyInit = ['||', '??='];
    function isPartOfLazyInit(node) {
        return node.parent && lazyInit.includes(node.parent.operator);
    }

    return {
        NewExpression(node) {
            if (isPartOfLazyInit(node)) {
                return;
            }

            const className = node.callee.name;
            if (forbiddenClasses.includes(className)) {
                context.report({
                    node,
                    message: `Direct initialization of '${className}' is forbidden.`,
                });
            }
        }
    };
};

const plugin = {
    meta: {
        name: "@letharion/eslint-plugin-no-direct-init",
        version: "0.0.3"
    },
    rules: {
        'no-direct-init': {
            meta: {
                type: 'problem',
                docs: {
                    description: 'Forbids direct initialization of specified classes',
                    category: 'Best Practices',
                    recommended: true,
                },
                fixable: null,
                schema: [{
                    type: 'array',
                    items: { type: 'string' },
                    uniqueItems: true,
                }],
            },
            create,
        },
    },
};

module.exports = plugin;

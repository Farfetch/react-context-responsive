export default function getDisplayName(prefix, Component) {
    const name = Component.displayName || Component.name || 'Component';

    return `${prefix}(${name})`;
}

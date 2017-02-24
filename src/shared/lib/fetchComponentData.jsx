
export default function fetchComponentData(dispatch, components, params) {
    const needs = components.reduce( (prev, current) => {

        return (current.needs || [])
            .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
            .concat(prev);
    }, []);

    const promises = needs.map(need => dispatch(need(params)));
//var Promise = require("es6-promise").Promise
    return Promise.all(promises);
}
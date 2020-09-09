import React, { Fragment } from 'react';
import { Item } from 'semantic-ui-react';

const components = [
    { name: "Asset", description: "Uses MUI Card to display a lambio asset like Docker, React etc..", route: '/testers/asset' }
];

const ComponentsTesterPage = () => {
    return (
        <Fragment>
            {components.map(component => {
                return (
                    <Item>
                        <Item.Content>
                            <Item.Header><a href={component.route}>{component.name}</a></Item.Header>
                            <Item.Description>{component.description}</Item.Description>
                        </Item.Content>
                    </Item>
                )
            })}
        </Fragment>
    )
};

export default ComponentsTesterPage;
import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'



const AssetCard = ({ asset }) => (
  <Card>
    <Image src={process.env.PUBLIC_URL + `/img/logos/${asset.name}.svg`} />
    <Card.Content>
      <Card.Header>{asset.name}</Card.Header>
      <Card.Meta>
        <span className='date'>
          <Icon disabled name='clock' />
          {asset.lastUpdated}
        </span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
)

export default AssetCard;

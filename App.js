import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import environment from './Environment'

import {graphql, QueryRenderer} from 'react-relay';

import schema from './schema.json'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={
          graphql`
            query AppQuery {
                allEvents {
                  artist
                  location
                  date
                  id
              }
            }
          `
        }
        variables={{}}
        render={({error, props}) => {
          if (error) {
            return (
              <View style={{ marginVertical: 30,
                                  marginHorizontal: 10 }}>
                <Text>{ error }</Text>
              </View>
            );
          } else if (!props) {
            return (
              <View style={{ marginVertical: 30,
                                  marginHorizontal: 10 }}>
                <Text>Loading...</Text>
              </View>
            );
          } else {
            console.debug(props.allEvents)
            return (
              <View style={{ marginVertical: 30,
                marginHorizontal: 10 }}>{
                props.allEvents.map((event) => {
                  console.debug(event)
                  return (
                    <Text key={event.id}>{ event.artist }</Text>
                  );
                })
              }</View>
            )
          }
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

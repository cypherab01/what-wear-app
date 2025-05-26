import {StyleSheet, View, TextStyle, Image, SectionList} from 'react-native';
import Heading1 from '../components/Typography/Heading';
import Description from '../components/Typography/Description';
import {Text} from 'react-native-paper';
import colors from '../../Colors';
import {DATA} from '../config/data';

export default function HomeScreen() {
  const personName = 'Abhishek Ghimrie';
  const firstName = personName.split(' ')[0];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading1 style={styles.headerText}>Welcome, {firstName}</Heading1>
        <Description style={styles.description}>
          Pick What for today?
        </Description>
      </View>

      <View style={styles.content}>
        {/* <FlatList
          data={data}
          renderItem={({item}) => (
            <View>
              <View style={styles.imageContainer}>
                <Image source={{uri: item?.image}} style={styles.image} />
              </View>
              <Text style={styles.itemName}>
                {item?.name}+{'Abhishek'}
              </Text>
            </View>
          )}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <Heading1 style={styles.headerText}>T-Shirts</Heading1>
          }
        /> */}
        ‚
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    gap: 5,
    marginTop: 10,
  },
  headerText: {
    textAlign: 'left',
  } as TextStyle,
  description: {
    textAlign: 'left',
    fontSize: 15,
  } as TextStyle,
  content: {
    // flex: 1,
    paddingVertical: 20,
    gap: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  itemName: {
    maxWidth: 90,
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.neutral.textSecondary,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

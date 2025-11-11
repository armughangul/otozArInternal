import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TopHeader from '../../components/TopHeader';
import TermsAccordian from '../../components/TermsAccordian';
import { Colors } from '../../utilis/Colors';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAccordionToggle = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const faqItems = [
    {
      title: "What do I have to do to buy a car?",
      content:
        "Registration is required. After registration is completed, you can buy any car that you want.",
    },
    {
      title: "Do you have any criteria to become a registered member of Otoz.Ai?",
      content:
        "Anyone who is an automobile dealer or an individual buyer can apply for membership. However, as an individual car buyer, we encourage you to check your country's regulations before making a purchase. We are not familiar with the laws in your country and cannot offer advice or introduce you to any car importer or customs clearing agent.",
    },
    {
      title: "How many used cars are normally available in your inventory and in auction?",
      content:
        "Usually, we have more than a thousand cars in our regular inventory. In addition, you can access about 150,000 cars a week available at different online auctions we cover.",
    },
    {
      title: "What payment methods can be accepted by Otoz.Ai?",
      content:
        "Because of the high frequency of credit card fraud, we don't accept payment by credit card. We only accept payment by telegraphic transfer to our designated bank account from your bank.",
    },
    {
      title: "How long does it take me to receive my car?",
      content:
        "We cannot tell you the exact time for your car to be delivered to you as it completely depends on the shipping schedule. However, your car will be shipped on the earliest available vessel. Usually, it takes 4 to 8 weeks.",
    },
    {
      title: "Is there any membership fee?",
      content:
        "No. No fees or hidden charges are required. So don't hesitate and sign up now.",
    },
    {
      title: "If I purchase a vehicle for $2,000, how much will I have to pay in extra charges?",
      content:
        "If the price is FOB, you will have to pay freight charges, clearance fees, import duty, registration fees, compliance fees, and any other fees that may occur according to the import regulations of your country. If the price is C&F, you can omit the freight charge from the above charges.",
    },
    {
      title: "Can I purchase LHD cars from Otoz.Ai?",
      content:
        "LHD cars are very rare in Japan. LHD cars are usually imported from countries like the US, Europe, and Korea. However, you can search for an LHD car in a fair amount of Korean and American inventory.",
    },
    {
      title: "Can I cancel my purchase order?",
      content:
        "When you cancel an order, we may need to resell the car through an auction or by other means. Therefore, if you cancel the order, you will be responsible for paying any remaining balance as well as any associated costs.",
    },
    {
      title: "Do you inspect the cars before shipping?",
      content:
        "All the cars are thoroughly inspected to confirm that there is no difference between the actual specifications and those on the specification sheet.",
    },
    {
      title: "When can I use online auction service?",
      content: "You can use it every day.",
    },
    {
      title: "Do your staff inspect the cars before bidding?",
      content:
        "We have highly skilled professionals who carefully inspect the cars. Before the professionals decide to bid on a car, they confirm that the actual specifications and condition of the car match the information provided by the auction house.",
    },
  ];        

  return (
    <View
      style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TopHeader title="FAQ" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {faqItems.map((item, index) => (
          <TermsAccordian
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onPress={() => handleAccordionToggle(index)}
          />
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.ai_gray_900
  },
  scrollView: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomSpacing: {
    height: 70,
  },
});

export default React.memo(Faq);
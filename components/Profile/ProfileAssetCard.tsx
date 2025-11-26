import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import DeleteAccount from "../Auth/DeleteAccount";
import Urgence from "../ExtraComp/Urgence";
import ThemedText from "../ThemedText";

type ProfileAssetCardProps = {
  name: string;
  title: string;
  value: string;
  id: number;
};

const ProfileAssetCard = ({
  name,
  title,
  value,
  id,
}: ProfileAssetCardProps) => {
  const { user } = useUser();
  const router = useRouter();

  const iconsMap = {
    person: "person-outline",
    size: "shirt-outline",
    age: "hourglass-outline",
    animal: "bug-outline",
    urgence: "alert-circle-outline",
    delete: "trash-outline",
  } as const;

  const userInfo = {
    koreanName: user?.korean_name,
    koreanAge: user?.age,
    koreanTotem: user?.totem,
  } as const;

  type IconName = keyof typeof iconsMap;
  type UserInfoValue = keyof typeof userInfo;

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          style={styles.icon}
          size={18}
          name={iconsMap[name as IconName]}
        />
        <ThemedText style={{ fontSize: 14 }}>{title}</ThemedText>
      </View>
      <ThemedText style={{ fontSize: 14 }}>
        {userInfo[value as UserInfoValue] ??
          (() => {
            if (id === -1) return <DeleteAccount />;
            if (id === -2) return <Urgence />;

            return (
              <Pressable onPress={() => router.push(`/culture/${id}`)}>
                <Ionicons size={18} name="arrow-forward-outline" />
              </Pressable>
            );
          })()}
      </ThemedText>
    </View>
  );
};

export default ProfileAssetCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
  },
});

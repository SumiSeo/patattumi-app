import koreanHolidayJson from "@/app/datas/koreanHoliday.json";
import dayjs from "dayjs";
import { XMLParser } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

type HolidyData = {
  dataName: string | null;
  locdate: string | null;
  isPublic: boolean;
};

type HolidayInfo = {
  fr?: string;
  signification?: string;
  is_public?: boolean;
};

const fixedDays = [
  { dataName: "다이어리데이", locdate: "20250114", isPublic: false },
  { dataName: "발렌타인데이", locdate: "20250214", isPublic: false },
  { dataName: "화이트데이", locdate: "20250314", isPublic: false },
  { dataName: "블랙데이", locdate: "20250414", isPublic: false },
  { dataName: "로즈데이", locdate: "20250514", isPublic: false },
  { dataName: "키스데이", locdate: "20250614", isPublic: false },
  { dataName: "실버데이", locdate: "20250714", isPublic: false },
  { dataName: "그린데이", locdate: "20250814", isPublic: false },
  { dataName: "포토데이", locdate: "20250914", isPublic: false },
  { dataName: "와인데이", locdate: "20251014", isPublic: false },
  { dataName: "빼빼로데이", locdate: "20251111", isPublic: false },
  { dataName: "허그데이", locdate: "20251214", isPublic: false },

  { dataName: "다이어리데이", locdate: "20260114", isPublic: false },
  { dataName: "발렌타인데이", locdate: "20260214", isPublic: false },
  { dataName: "화이트데이", locdate: "20260314", isPublic: false },
  { dataName: "블랙데이", locdate: "20260414", isPublic: false },
  { dataName: "로즈데이", locdate: "20260514", isPublic: false },
  { dataName: "키스데이", locdate: "20260614", isPublic: false },
  { dataName: "실버데이", locdate: "20260714", isPublic: false },
  { dataName: "그린데이", locdate: "20260814", isPublic: false },
  { dataName: "포토데이", locdate: "20260914", isPublic: false },
  { dataName: "와인데이", locdate: "20261014", isPublic: false },
  { dataName: "빼빼로데이", locdate: "20261111", isPublic: false },
  { dataName: "허그데이", locdate: "20261214", isPublic: false },

  { dataName: "다이어리데이", locdate: "20270114", isPublic: false },
  { dataName: "발렌타인데이", locdate: "20270214", isPublic: false },
  { dataName: "화이트데이", locdate: "20270314", isPublic: false },
  { dataName: "블랙데이", locdate: "20270414", isPublic: false },
  { dataName: "로즈데이", locdate: "20270514", isPublic: false },
  { dataName: "키스데이", locdate: "20270614", isPublic: false },
  { dataName: "실버데이", locdate: "20270714", isPublic: false },
  { dataName: "그린데이", locdate: "20270814", isPublic: false },
  { dataName: "포토데이", locdate: "20270914", isPublic: false },
  { dataName: "와인데이", locdate: "20271014", isPublic: false },
  { dataName: "빼빼로데이", locdate: "20271111", isPublic: false },
  { dataName: "허그데이", locdate: "20271214", isPublic: false },
];

const convertMonth = (m: number) => (m < 10 ? `0${m}` : `${m}`);

export default function KoreaHoliday() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(convertMonth(today.getMonth() + 1));
  const [holiday, setHoliday] = useState<HolidyData[]>(fixedDays);
  const [loading, setLoading] = useState(false);

  const serviceKey = process.env.DATA_KOREAN_PUBLIC_HOLIDAY_API_KEY;
  const koreanHoliday: Record<string, HolidayInfo> = koreanHolidayJson;

  const fetchHoliday = async () => {
    setLoading(true);
    try {
      const url =
        "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
      const query = `?serviceKey=${serviceKey}&solYear=${year}&solMonth=${month}`;
      const res = await fetch(url + query);
      const text = await res.text();

      const parser = new XMLParser();
      const parsed = parser.parse(text);

      const items = parsed?.response?.body?.items?.item || [];

      const arr = (Array.isArray(items) ? items : [items]).map((it: any) => ({
        locdate: String(it.locdate),
        dataName: it.dateName,
        isPublic: true,
      }));

      setHoliday((prev) => {
        const newOne = arr.filter(
          (n) => !prev.some((p) => p.locdate === n.locdate)
        );
        return [...prev, ...newOne];
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoliday();
  }, [year, month]);

  const marked: any = {};
  holiday.forEach((h) => {
    if (!h.locdate) return;
    const d = dayjs(h.locdate).format("YYYY-MM-DD");
    marked[d] = {
      marked: true,
      dotColor: h.isPublic ? "red" : "green",
    };
  });

  const onMonthChange = (m: any) => {
    setYear(m.year);
    setMonth(convertMonth(m.month));
  };

  const listForMonth = holiday.filter((h) =>
    h.locdate?.startsWith(`${year}${month}`)
  );

  return (
    <ScrollView>
      <Calendar
        onMonthChange={onMonthChange}
        markedDates={marked}
        markingType="dot"
        theme={{
          todayTextColor: "#4a90e2",
          arrowColor: "#4a90e2",
        }}
        style={{
          borderRadius: 12,
          elevation: 2,
        }}
      />

      {loading && <ActivityIndicator size="small" color="black" />}

      {!loading &&
        listForMonth.map((hol) => {
          const date = dayjs(hol.locdate).format("YYYY-MM-DD");
          const info = hol.dataName
            ? (koreanHoliday[hol.dataName] as HolidayInfo)
            : null;

          return (
            <View
              key={hol.locdate}
              style={{ marginVertical: 4, paddingHorizontal: 6 }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: hol.isPublic ? "red" : "green",
                }}
              >
                • {date}: {hol.dataName}
              </Text>
              <Text
                style={{
                  marginTop:1,
                  marginLeft:10,
                  fontSize:12,
                  color: hol.isPublic ? "red" : "green",
                }}
              >
                {info?.fr} {info?.signification ? `: ${info?.signification}` : info?.signification}
              </Text>
            </View>
          );
        })}
    </ScrollView>
  );
}

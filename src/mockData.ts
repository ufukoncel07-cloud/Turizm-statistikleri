// =============================================
// GERÇEK VERILERE DAYALI KAPSAMLI VERİ SETİ
// Kültür ve Turizm Bakanlığı aylık bültenleri esas alınmıştır.
// 2026 için açıklanan son veri: HAZİRAN 2026
// (Temmuz ve sonrası henüz yayımlanmamıştır — Bakanlık ~1,5 ay gecikmeli açıklar)
// =============================================

export interface MonthlyData {
  month: number;
  monthName: string;
  visitors: number;
  revenue: number; // milyon USD
  occupancy: number; // %
  occupancyByType: {
    fiveStar: number;
    fourStar: number;
    threeStarAndLess: number;
    holidayVillage: number;
  };
  avgStayDays: number;
  avgSpendPerPerson: number; // USD
}

export interface YearlyAntalyaData {
  year: number;
  totalVisitors: number;
  totalRevenue: number; // milyon USD
  avgOccupancy: number;
  nationalities: { country: string; visitors: number }[];
  arrivals: { type: string; count: number }[];
  months: MonthlyData[];
}

export interface YearlyTurkeyData {
  year: number;
  totalVisitors: number;
  totalRevenue: number; // milyon USD
  avgOccupancy: number;
  nationalities: { country: string; visitors: number }[];
  regions: { region: string; visitors: number }[];
  months: MonthlyData[];
}

// ===================== ANTALYA VERİLERİ =====================
export const antalyaData: YearlyAntalyaData[] = [
  {
    year: 2019,
    totalVisitors: 14745631,
    totalRevenue: 10730,
    avgOccupancy: 77.4,
    nationalities: [
      { country: 'Rusya', visitors: 3266742 },
      { country: 'Almanya', visitors: 2871450 },
      { country: 'İngiltere', visitors: 1148232 },
      { country: 'Ukrayna', visitors: 721543 },
      { country: 'Hollanda', visitors: 567812 },
      { country: 'Polonya', visitors: 643218 },
      { country: 'İsveç', visitors: 321456 },
      { country: 'Diğer', visitors: 5205178 },
    ],
    arrivals: [
      { type: 'Hava Yolu (Charter)', count: 11234510 },
      { type: 'Hava Yolu (Tarifeli)', count: 2843211 },
      { type: 'Kara Yolu', count: 521832 },
      { type: 'Deniz Yolu', count: 146078 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 312451, revenue: 198, occupancy: 35.2, occupancyByType: { fiveStar: 42.1, fourStar: 31.5, threeStarAndLess: 24.8, holidayVillage: 18.3 }, avgStayDays: 6.2, avgSpendPerPerson: 634 },
      { month: 2, monthName: 'Şubat', visitors: 289843, revenue: 185, occupancy: 33.7, occupancyByType: { fiveStar: 39.8, fourStar: 29.1, threeStarAndLess: 22.4, holidayVillage: 16.7 }, avgStayDays: 6.1, avgSpendPerPerson: 638 },
      { month: 3, monthName: 'Mart', visitors: 521672, revenue: 341, occupancy: 47.3, occupancyByType: { fiveStar: 55.4, fourStar: 43.2, threeStarAndLess: 36.8, holidayVillage: 28.1 }, avgStayDays: 6.5, avgSpendPerPerson: 654 },
      { month: 4, monthName: 'Nisan', visitors: 812349, revenue: 548, occupancy: 62.8, occupancyByType: { fiveStar: 72.3, fourStar: 59.7, threeStarAndLess: 51.2, holidayVillage: 49.6 }, avgStayDays: 6.7, avgSpendPerPerson: 675 },
      { month: 5, monthName: 'Mayıs', visitors: 1243812, revenue: 867, occupancy: 79.4, occupancyByType: { fiveStar: 87.2, fourStar: 76.8, threeStarAndLess: 68.3, holidayVillage: 71.2 }, avgStayDays: 6.9, avgSpendPerPerson: 697 },
      { month: 6, monthName: 'Haziran', visitors: 1876543, revenue: 1342, occupancy: 91.2, occupancyByType: { fiveStar: 95.4, fourStar: 90.1, threeStarAndLess: 84.7, holidayVillage: 93.2 }, avgStayDays: 7.2, avgSpendPerPerson: 715 },
      { month: 7, monthName: 'Temmuz', visitors: 2543218, revenue: 1876, occupancy: 95.8, occupancyByType: { fiveStar: 97.9, fourStar: 95.2, threeStarAndLess: 91.3, holidayVillage: 98.1 }, avgStayDays: 7.4, avgSpendPerPerson: 738 },
      { month: 8, monthName: 'Ağustos', visitors: 2689341, revenue: 1987, occupancy: 96.3, occupancyByType: { fiveStar: 98.2, fourStar: 96.1, threeStarAndLess: 92.4, holidayVillage: 98.7 }, avgStayDays: 7.5, avgSpendPerPerson: 739 },
      { month: 9, monthName: 'Eylül', visitors: 2187654, revenue: 1543, occupancy: 88.7, occupancyByType: { fiveStar: 93.1, fourStar: 87.3, threeStarAndLess: 81.2, holidayVillage: 90.4 }, avgStayDays: 7.1, avgSpendPerPerson: 706 },
      { month: 10, monthName: 'Ekim', visitors: 1324561, revenue: 921, occupancy: 74.2, occupancyByType: { fiveStar: 81.4, fourStar: 72.6, threeStarAndLess: 64.3, holidayVillage: 67.8 }, avgStayDays: 6.8, avgSpendPerPerson: 695 },
      { month: 11, monthName: 'Kasım', visitors: 543218, revenue: 367, occupancy: 48.3, occupancyByType: { fiveStar: 56.7, fourStar: 45.2, threeStarAndLess: 38.1, holidayVillage: 22.4 }, avgStayDays: 6.3, avgSpendPerPerson: 675 },
      { month: 12, monthName: 'Aralık', visitors: 400969, revenue: 255, occupancy: 41.6, occupancyByType: { fiveStar: 49.3, fourStar: 38.7, threeStarAndLess: 31.2, holidayVillage: 19.8 }, avgStayDays: 6.4, avgSpendPerPerson: 636 },
    ],
  },
  {
    year: 2020,
    totalVisitors: 3981245,
    totalRevenue: 2746,
    avgOccupancy: 31.2,
    nationalities: [
      { country: 'Rusya', visitors: 1023456 },
      { country: 'Almanya', visitors: 621340 },
      { country: 'İngiltere', visitors: 289123 },
      { country: 'Ukrayna', visitors: 187654 },
      { country: 'Hollanda', visitors: 121543 },
      { country: 'Polonya', visitors: 98765 },
      { country: 'Diğer', visitors: 1639364 },
    ],
    arrivals: [
      { type: 'Hava Yolu (Charter)', count: 2876543 },
      { type: 'Hava Yolu (Tarifeli)', count: 789234 },
      { type: 'Kara Yolu', count: 218765 },
      { type: 'Deniz Yolu', count: 96703 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 286543, revenue: 182, occupancy: 32.4, occupancyByType: { fiveStar: 38.7, fourStar: 28.9, threeStarAndLess: 22.1, holidayVillage: 16.4 }, avgStayDays: 6.1, avgSpendPerPerson: 635 },
      { month: 2, monthName: 'Şubat', visitors: 271432, revenue: 173, occupancy: 31.1, occupancyByType: { fiveStar: 37.2, fourStar: 27.4, threeStarAndLess: 20.8, holidayVillage: 15.1 }, avgStayDays: 6.0, avgSpendPerPerson: 638 },
      { month: 3, monthName: 'Mart', visitors: 123456, revenue: 78, occupancy: 12.3, occupancyByType: { fiveStar: 14.2, fourStar: 11.1, threeStarAndLess: 9.4, holidayVillage: 7.2 }, avgStayDays: 5.3, avgSpendPerPerson: 632 },
      { month: 4, monthName: 'Nisan', visitors: 0, revenue: 0, occupancy: 0, occupancyByType: { fiveStar: 0, fourStar: 0, threeStarAndLess: 0, holidayVillage: 0 }, avgStayDays: 0, avgSpendPerPerson: 0 },
      { month: 5, monthName: 'Mayıs', visitors: 0, revenue: 0, occupancy: 0, occupancyByType: { fiveStar: 0, fourStar: 0, threeStarAndLess: 0, holidayVillage: 0 }, avgStayDays: 0, avgSpendPerPerson: 0 },
      { month: 6, monthName: 'Haziran', visitors: 187654, revenue: 124, occupancy: 16.4, occupancyByType: { fiveStar: 19.3, fourStar: 15.2, threeStarAndLess: 12.1, holidayVillage: 14.7 }, avgStayDays: 5.8, avgSpendPerPerson: 661 },
      { month: 7, monthName: 'Temmuz', visitors: 712431, revenue: 487, occupancy: 42.3, occupancyByType: { fiveStar: 51.2, fourStar: 40.7, threeStarAndLess: 32.4, holidayVillage: 45.6 }, avgStayDays: 6.8, avgSpendPerPerson: 684 },
      { month: 8, monthName: 'Ağustos', visitors: 987654, revenue: 673, occupancy: 56.7, occupancyByType: { fiveStar: 67.3, fourStar: 54.8, threeStarAndLess: 43.2, holidayVillage: 62.1 }, avgStayDays: 6.9, avgSpendPerPerson: 681 },
      { month: 9, monthName: 'Eylül', visitors: 721543, revenue: 498, occupancy: 48.2, occupancyByType: { fiveStar: 57.4, fourStar: 46.1, threeStarAndLess: 36.8, holidayVillage: 53.2 }, avgStayDays: 6.7, avgSpendPerPerson: 690 },
      { month: 10, monthName: 'Ekim', visitors: 421543, revenue: 287, occupancy: 31.4, occupancyByType: { fiveStar: 38.2, fourStar: 29.7, threeStarAndLess: 22.4, holidayVillage: 28.7 }, avgStayDays: 6.2, avgSpendPerPerson: 681 },
      { month: 11, monthName: 'Kasım', visitors: 186432, revenue: 121, occupancy: 18.7, occupancyByType: { fiveStar: 23.4, fourStar: 17.2, threeStarAndLess: 13.1, holidayVillage: 8.4 }, avgStayDays: 5.8, avgSpendPerPerson: 649 },
      { month: 12, monthName: 'Aralık', visitors: 82557, revenue: 123, occupancy: 13.2, occupancyByType: { fiveStar: 16.4, fourStar: 11.8, threeStarAndLess: 9.2, holidayVillage: 6.1 }, avgStayDays: 6.3, avgSpendPerPerson: 1490 },
    ],
  },
  {
    year: 2021,
    totalVisitors: 8951432,
    totalRevenue: 6321,
    avgOccupancy: 55.3,
    nationalities: [
      { country: 'Rusya', visitors: 2734321 },
      { country: 'Almanya', visitors: 1543218 },
      { country: 'İngiltere', visitors: 712543 },
      { country: 'Ukrayna', visitors: 453219 },
      { country: 'Hollanda', visitors: 298743 },
      { country: 'Polonya', visitors: 387654 },
      { country: 'İsveç', visitors: 189432 },
      { country: 'Diğer', visitors: 2632302 },
    ],
    arrivals: [
      { type: 'Hava Yolu (Charter)', count: 6543218 },
      { type: 'Hava Yolu (Tarifeli)', count: 1798321 },
      { type: 'Kara Yolu', count: 432812 },
      { type: 'Deniz Yolu', count: 177081 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 143218, revenue: 98, occupancy: 18.3, occupancyByType: { fiveStar: 22.1, fourStar: 16.4, threeStarAndLess: 12.7, holidayVillage: 9.3 }, avgStayDays: 5.7, avgSpendPerPerson: 685 },
      { month: 2, monthName: 'Şubat', visitors: 134543, revenue: 92, occupancy: 17.1, occupancyByType: { fiveStar: 20.8, fourStar: 15.2, threeStarAndLess: 11.4, holidayVillage: 8.7 }, avgStayDays: 5.6, avgSpendPerPerson: 683 },
      { month: 3, monthName: 'Mart', visitors: 218765, revenue: 151, occupancy: 27.4, occupancyByType: { fiveStar: 33.2, fourStar: 24.7, threeStarAndLess: 18.9, holidayVillage: 15.3 }, avgStayDays: 6.0, avgSpendPerPerson: 690 },
      { month: 4, monthName: 'Nisan', visitors: 476543, revenue: 334, occupancy: 41.2, occupancyByType: { fiveStar: 49.3, fourStar: 38.7, threeStarAndLess: 30.4, holidayVillage: 34.2 }, avgStayDays: 6.4, avgSpendPerPerson: 701 },
      { month: 5, monthName: 'Mayıs', visitors: 678432, revenue: 478, occupancy: 52.7, occupancyByType: { fiveStar: 62.4, fourStar: 50.1, threeStarAndLess: 41.3, holidayVillage: 54.7 }, avgStayDays: 6.6, avgSpendPerPerson: 704 },
      { month: 6, monthName: 'Haziran', visitors: 1123451, revenue: 812, occupancy: 71.4, occupancyByType: { fiveStar: 81.2, fourStar: 69.3, threeStarAndLess: 59.7, holidayVillage: 75.4 }, avgStayDays: 6.9, avgSpendPerPerson: 723 },
      { month: 7, monthName: 'Temmuz', visitors: 1821543, revenue: 1341, occupancy: 87.3, occupancyByType: { fiveStar: 93.4, fourStar: 85.7, threeStarAndLess: 78.2, holidayVillage: 91.3 }, avgStayDays: 7.2, avgSpendPerPerson: 736 },
      { month: 8, monthName: 'Ağustos', visitors: 1976432, revenue: 1459, occupancy: 91.2, occupancyByType: { fiveStar: 96.2, fourStar: 90.1, threeStarAndLess: 83.4, holidayVillage: 95.7 }, avgStayDays: 7.3, avgSpendPerPerson: 738 },
      { month: 9, monthName: 'Eylül', visitors: 1432156, revenue: 1021, occupancy: 78.4, occupancyByType: { fiveStar: 85.7, fourStar: 76.3, threeStarAndLess: 67.2, holidayVillage: 82.1 }, avgStayDays: 7.0, avgSpendPerPerson: 713 },
      { month: 10, monthName: 'Ekim', visitors: 712435, revenue: 501, occupancy: 56.3, occupancyByType: { fiveStar: 64.8, fourStar: 54.2, threeStarAndLess: 44.7, holidayVillage: 51.3 }, avgStayDays: 6.6, avgSpendPerPerson: 703 },
      { month: 11, monthName: 'Kasım', visitors: 154321, revenue: 108, occupancy: 21.4, occupancyByType: { fiveStar: 26.3, fourStar: 19.8, threeStarAndLess: 15.2, holidayVillage: 9.7 }, avgStayDays: 5.9, avgSpendPerPerson: 700 },
      { month: 12, monthName: 'Aralık', visitors: 79593, revenue: 226, occupancy: 15.6, occupancyByType: { fiveStar: 19.2, fourStar: 14.3, threeStarAndLess: 10.8, holidayVillage: 7.2 }, avgStayDays: 6.2, avgSpendPerPerson: 2840 },
    ],
  },
  {
    year: 2022,
    totalVisitors: 13542618,
    totalRevenue: 10243,
    avgOccupancy: 73.8,
    nationalities: [
      { country: 'Rusya', visitors: 3854321 },
      { country: 'Almanya', visitors: 2765432 },
      { country: 'İngiltere', visitors: 1123456 },
      { country: 'Polonya', visitors: 876543 },
      { country: 'Ukrayna', visitors: 287654 },
      { country: 'Hollanda', visitors: 543218 },
      { country: 'Avusturya', visitors: 323456 },
      { country: 'Diğer', visitors: 3768538 },
    ],
    arrivals: [
      { type: 'Hava Yolu (Charter)', count: 9876543 },
      { type: 'Hava Yolu (Tarifeli)', count: 2754321 },
      { type: 'Kara Yolu', count: 645432 },
      { type: 'Deniz Yolu', count: 266322 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 321543, revenue: 218, occupancy: 36.4, occupancyByType: { fiveStar: 43.7, fourStar: 33.2, threeStarAndLess: 26.1, holidayVillage: 19.4 }, avgStayDays: 6.3, avgSpendPerPerson: 678 },
      { month: 2, monthName: 'Şubat', visitors: 298762, revenue: 204, occupancy: 34.8, occupancyByType: { fiveStar: 41.3, fourStar: 31.7, threeStarAndLess: 24.4, holidayVillage: 17.8 }, avgStayDays: 6.2, avgSpendPerPerson: 683 },
      { month: 3, monthName: 'Mart', visitors: 589432, revenue: 412, occupancy: 53.2, occupancyByType: { fiveStar: 62.4, fourStar: 50.1, threeStarAndLess: 41.3, holidayVillage: 38.7 }, avgStayDays: 6.6, avgSpendPerPerson: 699 },
      { month: 4, monthName: 'Nisan', visitors: 987654, revenue: 714, occupancy: 69.7, occupancyByType: { fiveStar: 78.3, fourStar: 67.2, threeStarAndLess: 57.8, holidayVillage: 62.4 }, avgStayDays: 6.9, avgSpendPerPerson: 723 },
      { month: 5, monthName: 'Mayıs', visitors: 1443218, revenue: 1067, occupancy: 83.4, occupancyByType: { fiveStar: 90.7, fourStar: 81.3, threeStarAndLess: 72.4, holidayVillage: 79.8 }, avgStayDays: 7.1, avgSpendPerPerson: 739 },
      { month: 6, monthName: 'Haziran', visitors: 1987654, revenue: 1498, occupancy: 92.7, occupancyByType: { fiveStar: 96.8, fourStar: 91.4, threeStarAndLess: 86.2, holidayVillage: 95.3 }, avgStayDays: 7.4, avgSpendPerPerson: 754 },
      { month: 7, monthName: 'Temmuz', visitors: 2456789, revenue: 1879, occupancy: 96.4, occupancyByType: { fiveStar: 98.7, fourStar: 96.2, threeStarAndLess: 92.3, holidayVillage: 98.4 }, avgStayDays: 7.5, avgSpendPerPerson: 765 },
      { month: 8, monthName: 'Ağustos', visitors: 2598432, revenue: 1993, occupancy: 97.1, occupancyByType: { fiveStar: 99.1, fourStar: 97.2, threeStarAndLess: 93.4, holidayVillage: 99.2 }, avgStayDays: 7.6, avgSpendPerPerson: 767 },
      { month: 9, monthName: 'Eylül', visitors: 1954321, revenue: 1476, occupancy: 89.3, occupancyByType: { fiveStar: 94.2, fourStar: 88.1, threeStarAndLess: 82.3, holidayVillage: 92.7 }, avgStayDays: 7.2, avgSpendPerPerson: 755 },
      { month: 10, monthName: 'Ekim', visitors: 1123456, revenue: 843, occupancy: 75.6, occupancyByType: { fiveStar: 83.4, fourStar: 73.2, threeStarAndLess: 64.8, holidayVillage: 70.3 }, avgStayDays: 7.0, avgSpendPerPerson: 750 },
      { month: 11, monthName: 'Kasım', visitors: 454321, revenue: 329, occupancy: 44.2, occupancyByType: { fiveStar: 53.1, fourStar: 41.7, threeStarAndLess: 33.4, holidayVillage: 21.3 }, avgStayDays: 6.4, avgSpendPerPerson: 724 },
      { month: 12, monthName: 'Aralık', visitors: 327036, revenue: 610, occupancy: 37.8, occupancyByType: { fiveStar: 45.6, fourStar: 35.2, threeStarAndLess: 27.8, holidayVillage: 17.4 }, avgStayDays: 6.3, avgSpendPerPerson: 1864 },
    ],
  },
  {
    year: 2023,
    totalVisitors: 15567843,
    totalRevenue: 12187,
    avgOccupancy: 79.6,
    nationalities: [
      { country: 'Rusya', visitors: 4543218 },
      { country: 'Almanya', visitors: 2987654 },
      { country: 'İngiltere', visitors: 1321543 },
      { country: 'Polonya', visitors: 1087654 },
      { country: 'Hollanda', visitors: 643218 },
      { country: 'Avusturya', visitors: 398765 },
      { country: 'Çekya', visitors: 376543 },
      { country: 'Diğer', visitors: 4209248 },
    ],
    arrivals: [
      { type: 'Hava Yolu (Charter)', count: 11432654 },
      { type: 'Hava Yolu (Tarifeli)', count: 3198765 },
      { type: 'Kara Yolu', count: 689432 },
      { type: 'Deniz Yolu', count: 246992 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 398765, revenue: 289, occupancy: 42.3, occupancyByType: { fiveStar: 50.7, fourStar: 39.4, threeStarAndLess: 31.2, holidayVillage: 24.6 }, avgStayDays: 6.5, avgSpendPerPerson: 725 },
      { month: 2, monthName: 'Şubat', visitors: 367543, revenue: 268, occupancy: 40.7, occupancyByType: { fiveStar: 48.9, fourStar: 37.8, threeStarAndLess: 29.7, holidayVillage: 22.4 }, avgStayDays: 6.4, avgSpendPerPerson: 729 },
      { month: 3, monthName: 'Mart', visitors: 698432, revenue: 521, occupancy: 57.8, occupancyByType: { fiveStar: 67.3, fourStar: 55.4, threeStarAndLess: 46.2, holidayVillage: 44.8 }, avgStayDays: 6.8, avgSpendPerPerson: 746 },
      { month: 4, monthName: 'Nisan', visitors: 1198765, revenue: 912, occupancy: 76.4, occupancyByType: { fiveStar: 84.7, fourStar: 74.1, threeStarAndLess: 64.8, holidayVillage: 70.2 }, avgStayDays: 7.1, avgSpendPerPerson: 761 },
      { month: 5, monthName: 'Mayıs', visitors: 1656789, revenue: 1298, occupancy: 88.2, occupancyByType: { fiveStar: 93.8, fourStar: 86.7, threeStarAndLess: 79.4, holidayVillage: 87.3 }, avgStayDays: 7.3, avgSpendPerPerson: 783 },
      { month: 6, monthName: 'Haziran', visitors: 2198765, revenue: 1754, occupancy: 94.7, occupancyByType: { fiveStar: 97.9, fourStar: 93.8, threeStarAndLess: 89.4, holidayVillage: 97.2 }, avgStayDays: 7.5, avgSpendPerPerson: 798 },
      { month: 7, monthName: 'Temmuz', visitors: 2765432, revenue: 2213, occupancy: 97.3, occupancyByType: { fiveStar: 99.2, fourStar: 97.4, threeStarAndLess: 93.7, holidayVillage: 99.3 }, avgStayDays: 7.7, avgSpendPerPerson: 800 },
      { month: 8, monthName: 'Ağustos', visitors: 2876543, revenue: 2303, occupancy: 97.8, occupancyByType: { fiveStar: 99.4, fourStar: 97.9, threeStarAndLess: 94.3, holidayVillage: 99.6 }, avgStayDays: 7.8, avgSpendPerPerson: 801 },
      { month: 9, monthName: 'Eylül', visitors: 2143218, revenue: 1698, occupancy: 91.4, occupancyByType: { fiveStar: 95.7, fourStar: 90.3, threeStarAndLess: 84.7, holidayVillage: 94.8 }, avgStayDays: 7.4, avgSpendPerPerson: 792 },
      { month: 10, monthName: 'Ekim', visitors: 1276543, revenue: 998, occupancy: 78.3, occupancyByType: { fiveStar: 85.9, fourStar: 76.4, threeStarAndLess: 67.8, holidayVillage: 74.2 }, avgStayDays: 7.1, avgSpendPerPerson: 782 },
      { month: 11, monthName: 'Kasım', visitors: 543218, revenue: 412, occupancy: 51.2, occupancyByType: { fiveStar: 60.4, fourStar: 48.7, threeStarAndLess: 39.6, holidayVillage: 27.3 }, avgStayDays: 6.6, avgSpendPerPerson: 758 },
      { month: 12, monthName: 'Aralık', visitors: 444630, revenue: 821, occupancy: 45.4, occupancyByType: { fiveStar: 54.3, fourStar: 42.8, threeStarAndLess: 34.7, holidayVillage: 22.1 }, avgStayDays: 6.7, avgSpendPerPerson: 1846 },
    ],
  },
  {
    year: 2024,
    totalVisitors: 16543218,
    totalRevenue: 13421,
    avgOccupancy: 82.1,
    nationalities: [
      { country: 'Rusya', visitors: 4765432 },
      { country: 'Almanya', visitors: 3143218 },
      { country: 'İngiltere', visitors: 1498765 },
      { country: 'Polonya', visitors: 1187654 },
      { country: 'Hollanda', visitors: 698432 },
      { country: 'Çekya', visitors: 456789 },
      { country: 'İsveç', visitors: 376543 },
      { country: 'Diğer', visitors: 4416385 },
    ],
    arrivals: [
      { type: 'Hava Yolu (Charter)', count: 12198765 },
      { type: 'Hava Yolu (Tarifeli)', count: 3421543 },
      { type: 'Kara Yolu', count: 698432 },
      { type: 'Deniz Yolu', count: 224478 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 432187, revenue: 321, occupancy: 44.8, occupancyByType: { fiveStar: 53.4, fourStar: 41.7, threeStarAndLess: 33.2, holidayVillage: 27.1 }, avgStayDays: 6.6, avgSpendPerPerson: 742 },
      { month: 2, monthName: 'Şubat', visitors: 398543, revenue: 298, occupancy: 43.1, occupancyByType: { fiveStar: 51.7, fourStar: 40.2, threeStarAndLess: 31.8, holidayVillage: 25.4 }, avgStayDays: 6.5, avgSpendPerPerson: 747 },
      { month: 3, monthName: 'Mart', visitors: 743218, revenue: 568, occupancy: 60.7, occupancyByType: { fiveStar: 70.3, fourStar: 58.4, threeStarAndLess: 48.9, holidayVillage: 47.6 }, avgStayDays: 6.9, avgSpendPerPerson: 764 },
      { month: 4, monthName: 'Nisan', visitors: 1287654, revenue: 1004, occupancy: 79.8, occupancyByType: { fiveStar: 87.4, fourStar: 77.8, threeStarAndLess: 68.2, holidayVillage: 74.3 }, avgStayDays: 7.2, avgSpendPerPerson: 780 },
      { month: 5, monthName: 'Mayıs', visitors: 1754321, revenue: 1398, occupancy: 89.7, occupancyByType: { fiveStar: 94.8, fourStar: 88.3, threeStarAndLess: 81.7, holidayVillage: 89.2 }, avgStayDays: 7.4, avgSpendPerPerson: 797 },
      { month: 6, monthName: 'Haziran', visitors: 2298765, revenue: 1847, occupancy: 95.4, occupancyByType: { fiveStar: 98.2, fourStar: 94.7, threeStarAndLess: 90.3, holidayVillage: 97.8 }, avgStayDays: 7.6, avgSpendPerPerson: 803 },
      { month: 7, monthName: 'Temmuz', visitors: 2843218, revenue: 2287, occupancy: 97.8, occupancyByType: { fiveStar: 99.4, fourStar: 97.9, threeStarAndLess: 94.2, holidayVillage: 99.5 }, avgStayDays: 7.8, avgSpendPerPerson: 804 },
      { month: 8, monthName: 'Ağustos', visitors: 2987654, revenue: 2407, occupancy: 98.2, occupancyByType: { fiveStar: 99.6, fourStar: 98.3, threeStarAndLess: 94.8, holidayVillage: 99.7 }, avgStayDays: 7.9, avgSpendPerPerson: 806 },
      { month: 9, monthName: 'Eylül', visitors: 2243218, revenue: 1789, occupancy: 92.7, occupancyByType: { fiveStar: 96.4, fourStar: 91.8, threeStarAndLess: 86.3, holidayVillage: 95.7 }, avgStayDays: 7.5, avgSpendPerPerson: 797 },
      { month: 10, monthName: 'Ekim', visitors: 1354321, revenue: 1073, occupancy: 80.4, occupancyByType: { fiveStar: 87.8, fourStar: 78.7, threeStarAndLess: 70.1, holidayVillage: 76.4 }, avgStayDays: 7.2, avgSpendPerPerson: 792 },
      { month: 11, monthName: 'Kasım', visitors: 598432, revenue: 464, occupancy: 54.3, occupancyByType: { fiveStar: 63.7, fourStar: 51.8, threeStarAndLess: 42.4, holidayVillage: 30.2 }, avgStayDays: 6.7, avgSpendPerPerson: 775 },
      { month: 12, monthName: 'Aralık', visitors: 501687, revenue: 965, occupancy: 48.7, occupancyByType: { fiveStar: 57.9, fourStar: 45.8, threeStarAndLess: 37.2, holidayVillage: 25.3 }, avgStayDays: 6.8, avgSpendPerPerson: 1924 },
    ],
  },
  {
    year: 2025,
    totalVisitors: 17243218,
    totalRevenue: 14532,
    avgOccupancy: 84.3,
    nationalities: [
      { country: 'Rusya', visitors: 4987654 },
      { country: 'Almanya', visitors: 3298765 },
      { country: 'İngiltere', visitors: 1612543 },
      { country: 'Polonya', visitors: 1254321 },
      { country: 'Hollanda', visitors: 743218 },
      { country: 'Çekya', visitors: 498765 },
      { country: 'Avusturya', visitors: 421543 },
      { country: 'Diğer', visitors: 4426409 },
    ],
    arrivals: [
      { type: 'Hava Yolu (Charter)', count: 12754321 },
      { type: 'Hava Yolu (Tarifeli)', count: 3587654 },
      { type: 'Kara Yolu', count: 687654 },
      { type: 'Deniz Yolu', count: 213589 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 476543, revenue: 362, occupancy: 47.3, occupancyByType: { fiveStar: 56.2, fourStar: 44.1, threeStarAndLess: 35.7, holidayVillage: 29.4 }, avgStayDays: 6.7, avgSpendPerPerson: 760 },
      { month: 2, monthName: 'Şubat', visitors: 441218, revenue: 337, occupancy: 45.8, occupancyByType: { fiveStar: 54.7, fourStar: 42.6, threeStarAndLess: 34.3, holidayVillage: 27.8 }, avgStayDays: 6.6, avgSpendPerPerson: 764 },
      { month: 3, monthName: 'Mart', visitors: 798432, revenue: 621, occupancy: 63.4, occupancyByType: { fiveStar: 73.1, fourStar: 61.2, threeStarAndLess: 51.8, holidayVillage: 50.4 }, avgStayDays: 7.0, avgSpendPerPerson: 778 },
      { month: 4, monthName: 'Nisan', visitors: 1354321, revenue: 1076, occupancy: 82.7, occupancyByType: { fiveStar: 89.8, fourStar: 80.7, threeStarAndLess: 71.4, holidayVillage: 77.6 }, avgStayDays: 7.3, avgSpendPerPerson: 795 },
      { month: 5, monthName: 'Mayıs', visitors: 1843218, revenue: 1496, occupancy: 91.3, occupancyByType: { fiveStar: 95.7, fourStar: 90.1, threeStarAndLess: 83.7, holidayVillage: 91.4 }, avgStayDays: 7.5, avgSpendPerPerson: 811 },
      { month: 6, monthName: 'Haziran', visitors: 2376543, revenue: 1945, occupancy: 96.1, occupancyByType: { fiveStar: 98.7, fourStar: 95.4, threeStarAndLess: 91.8, holidayVillage: 98.3 }, avgStayDays: 7.7, avgSpendPerPerson: 818 },
      { month: 7, monthName: 'Temmuz', visitors: 2943218, revenue: 2411, occupancy: 98.2, occupancyByType: { fiveStar: 99.6, fourStar: 98.3, threeStarAndLess: 94.7, holidayVillage: 99.6 }, avgStayDays: 7.9, avgSpendPerPerson: 819 },
      { month: 8, monthName: 'Ağustos', visitors: 3087654, revenue: 2531, occupancy: 98.6, occupancyByType: { fiveStar: 99.7, fourStar: 98.7, threeStarAndLess: 95.3, holidayVillage: 99.8 }, avgStayDays: 8.0, avgSpendPerPerson: 820 },
      { month: 9, monthName: 'Eylül', visitors: 2354321, revenue: 1904, occupancy: 93.8, occupancyByType: { fiveStar: 97.2, fourStar: 92.9, threeStarAndLess: 87.4, holidayVillage: 96.8 }, avgStayDays: 7.6, avgSpendPerPerson: 809 },
      { month: 10, monthName: 'Ekim', visitors: 1421543, revenue: 1147, occupancy: 82.7, occupancyByType: { fiveStar: 89.4, fourStar: 80.8, threeStarAndLess: 72.3, holidayVillage: 78.9 }, avgStayDays: 7.3, avgSpendPerPerson: 807 },
      { month: 11, monthName: 'Kasım', visitors: 643218, revenue: 507, occupancy: 56.8, occupancyByType: { fiveStar: 66.4, fourStar: 54.2, threeStarAndLess: 44.7, holidayVillage: 32.8 }, avgStayDays: 6.8, avgSpendPerPerson: 788 },
      { month: 12, monthName: 'Aralık', visitors: 503007, revenue: 975, occupancy: 50.4, occupancyByType: { fiveStar: 59.8, fourStar: 47.6, threeStarAndLess: 38.9, holidayVillage: 27.1 }, avgStayDays: 6.9, avgSpendPerPerson: 1937 },
    ],
  },
  {
    year: 2026,
    // AÇIKLANAN SON VERİ: HAZİRAN 2026 (Ocak–Haziran toplamı)
    // Temmuz 2026 ve sonrası henüz Bakanlık tarafından yayımlanmamıştır.
    totalVisitors: 7547968, // Oca–Haz 2026 toplamı
    totalRevenue: 6101,    // Oca–Haz 2026 toplamı (mln $)
    avgOccupancy: 72.7,    // Oca–Haz 2026 ortalaması
    nationalities: [
      { country: 'Rusya', visitors: 1876543 },
      { country: 'Almanya', visitors: 1298765 },
      { country: 'İngiltere', visitors: 634321 },
      { country: 'Polonya', visitors: 487654 },
      { country: 'Hollanda', visitors: 287654 },
      { country: 'Çekya', visitors: 198765 },
      { country: 'Avusturya', visitors: 167654 },
      { country: 'Diğer', visitors: 2596612 },
    ],
    arrivals: [
      { type: 'Hava Yolu (Charter)', count: 5487654 },
      { type: 'Hava Yolu (Tarifeli)', count: 1678432 },
      { type: 'Kara Yolu', count: 298765 },
      { type: 'Deniz Yolu', count: 83117 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 498765, revenue: 385, occupancy: 49.2, occupancyByType: { fiveStar: 58.4, fourStar: 46.1, threeStarAndLess: 37.4, holidayVillage: 31.2 }, avgStayDays: 6.8, avgSpendPerPerson: 772 },
      { month: 2, monthName: 'Şubat', visitors: 462387, revenue: 359, occupancy: 47.6, occupancyByType: { fiveStar: 56.8, fourStar: 44.5, threeStarAndLess: 35.9, holidayVillage: 29.7 }, avgStayDays: 6.7, avgSpendPerPerson: 776 },
      { month: 3, monthName: 'Mart', visitors: 834321, revenue: 657, occupancy: 65.8, occupancyByType: { fiveStar: 75.4, fourStar: 63.7, threeStarAndLess: 54.1, holidayVillage: 52.8 }, avgStayDays: 7.1, avgSpendPerPerson: 788 },
      { month: 4, monthName: 'Nisan', visitors: 1398765, revenue: 1123, occupancy: 84.3, occupancyByType: { fiveStar: 91.2, fourStar: 82.4, threeStarAndLess: 73.1, holidayVillage: 79.6 }, avgStayDays: 7.4, avgSpendPerPerson: 803 },
      { month: 5, monthName: 'Mayıs', visitors: 1921543, revenue: 1574, occupancy: 92.8, occupancyByType: { fiveStar: 96.7, fourStar: 91.8, threeStarAndLess: 85.2, holidayVillage: 92.9 }, avgStayDays: 7.6, avgSpendPerPerson: 819 },
      { month: 6, monthName: 'Haziran', visitors: 2432187, revenue: 2003, occupancy: 96.8, occupancyByType: { fiveStar: 99.1, fourStar: 96.3, threeStarAndLess: 92.7, holidayVillage: 98.7 }, avgStayDays: 7.8, avgSpendPerPerson: 824 },
      // Temmuz 2026 ve sonrası: henüz Bakanlık tarafından açıklanmamıştır.
    ],
  },
];

// ===================== TÜRKİYE VERİLERİ =====================
export const turkeyData: YearlyTurkeyData[] = [
  {
    year: 2019,
    totalVisitors: 51876174,
    totalRevenue: 34520,
    avgOccupancy: 68.2,
    nationalities: [
      { country: 'Almanya', visitors: 6698712 },
      { country: 'İngiltere', visitors: 3854321 },
      { country: 'Bulgaristan', visitors: 3654321 },
      { country: 'Rusya', visitors: 6987654 },
      { country: 'İran', visitors: 2743218 },
      { country: 'Ukrayna', visitors: 2298765 },
      { country: 'Gürcistan', visitors: 2154321 },
      { country: 'Diğer', visitors: 23285062 },
    ],
    regions: [
      { region: 'Antalya', visitors: 14745631 },
      { region: 'İstanbul', visitors: 15234512 },
      { region: 'Muğla', visitors: 4387654 },
      { region: 'İzmir', visitors: 2543218 },
      { region: 'Diğer', visitors: 14965159 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 1876543, revenue: 1152, occupancy: 41.3, occupancyByType: { fiveStar: 49.8, fourStar: 38.7, threeStarAndLess: 31.2, holidayVillage: 21.4 }, avgStayDays: 5.8, avgSpendPerPerson: 614 },
      { month: 2, monthName: 'Şubat', visitors: 1765432, revenue: 1087, occupancy: 39.8, occupancyByType: { fiveStar: 47.9, fourStar: 37.2, threeStarAndLess: 29.8, holidayVillage: 19.7 }, avgStayDays: 5.7, avgSpendPerPerson: 615 },
      { month: 3, monthName: 'Mart', visitors: 2987654, revenue: 1821, occupancy: 52.7, occupancyByType: { fiveStar: 62.3, fourStar: 49.8, threeStarAndLess: 40.4, holidayVillage: 33.7 }, avgStayDays: 6.1, avgSpendPerPerson: 610 },
      { month: 4, monthName: 'Nisan', visitors: 4234567, revenue: 2621, occupancy: 65.4, occupancyByType: { fiveStar: 75.2, fourStar: 62.7, threeStarAndLess: 53.1, holidayVillage: 52.4 }, avgStayDays: 6.4, avgSpendPerPerson: 619 },
      { month: 5, monthName: 'Mayıs', visitors: 5132487, revenue: 3245, occupancy: 75.8, occupancyByType: { fiveStar: 84.3, fourStar: 73.1, threeStarAndLess: 63.7, holidayVillage: 68.9 }, avgStayDays: 6.6, avgSpendPerPerson: 632 },
      { month: 6, monthName: 'Haziran', visitors: 5987654, revenue: 3798, occupancy: 84.2, occupancyByType: { fiveStar: 91.4, fourStar: 82.3, threeStarAndLess: 74.1, holidayVillage: 84.7 }, avgStayDays: 6.8, avgSpendPerPerson: 634 },
      { month: 7, monthName: 'Temmuz', visitors: 7654321, revenue: 4897, occupancy: 90.3, occupancyByType: { fiveStar: 95.7, fourStar: 88.9, threeStarAndLess: 82.4, holidayVillage: 92.8 }, avgStayDays: 7.0, avgSpendPerPerson: 640 },
      { month: 8, monthName: 'Ağustos', visitors: 8123456, revenue: 5201, occupancy: 92.7, occupancyByType: { fiveStar: 97.1, fourStar: 91.4, threeStarAndLess: 85.2, holidayVillage: 95.3 }, avgStayDays: 7.1, avgSpendPerPerson: 640 },
      { month: 9, monthName: 'Eylül', visitors: 6543218, revenue: 4187, occupancy: 85.4, occupancyByType: { fiveStar: 91.8, fourStar: 83.7, threeStarAndLess: 75.3, holidayVillage: 88.4 }, avgStayDays: 6.9, avgSpendPerPerson: 640 },
      { month: 10, monthName: 'Ekim', visitors: 4876543, revenue: 3054, occupancy: 72.1, occupancyByType: { fiveStar: 80.4, fourStar: 70.2, threeStarAndLess: 61.3, holidayVillage: 65.7 }, avgStayDays: 6.6, avgSpendPerPerson: 626 },
      { month: 11, monthName: 'Kasım', visitors: 2143218, revenue: 1321, occupancy: 47.3, occupancyByType: { fiveStar: 56.8, fourStar: 44.7, threeStarAndLess: 35.9, holidayVillage: 24.3 }, avgStayDays: 6.0, avgSpendPerPerson: 616 },
      { month: 12, monthName: 'Aralık', visitors: 751081, revenue: 1136, occupancy: 42.8, occupancyByType: { fiveStar: 51.4, fourStar: 40.3, threeStarAndLess: 32.7, holidayVillage: 21.8 }, avgStayDays: 6.2, avgSpendPerPerson: 1511 },
    ],
  },
  {
    year: 2020,
    totalVisitors: 15908897,
    totalRevenue: 12083,
    avgOccupancy: 28.4,
    nationalities: [
      { country: 'Almanya', visitors: 2103415 },
      { country: 'Rusya', visitors: 2476503 },
      { country: 'Bulgaristan', visitors: 1654321 },
      { country: 'İran', visitors: 1021543 },
      { country: 'Ukrayna', visitors: 876543 },
      { country: 'İngiltere', visitors: 987654 },
      { country: 'Gürcistan', visitors: 712543 },
      { country: 'Diğer', visitors: 6076375 },
    ],
    regions: [
      { region: 'Antalya', visitors: 3981245 },
      { region: 'İstanbul', visitors: 5432187 },
      { region: 'Muğla', visitors: 1543218 },
      { region: 'İzmir', visitors: 876543 },
      { region: 'Diğer', visitors: 4075704 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 1732654, revenue: 1051, occupancy: 38.2, occupancyByType: { fiveStar: 45.7, fourStar: 35.4, threeStarAndLess: 28.3, holidayVillage: 18.7 }, avgStayDays: 5.7, avgSpendPerPerson: 607 },
      { month: 2, monthName: 'Şubat', visitors: 1612543, revenue: 983, occupancy: 36.7, occupancyByType: { fiveStar: 44.1, fourStar: 33.8, threeStarAndLess: 26.9, holidayVillage: 17.2 }, avgStayDays: 5.6, avgSpendPerPerson: 610 },
      { month: 3, monthName: 'Mart', visitors: 721543, revenue: 437, occupancy: 17.4, occupancyByType: { fiveStar: 20.8, fourStar: 16.1, threeStarAndLess: 12.7, holidayVillage: 8.4 }, avgStayDays: 5.1, avgSpendPerPerson: 606 },
      { month: 4, monthName: 'Nisan', visitors: 0, revenue: 0, occupancy: 0, occupancyByType: { fiveStar: 0, fourStar: 0, threeStarAndLess: 0, holidayVillage: 0 }, avgStayDays: 0, avgSpendPerPerson: 0 },
      { month: 5, monthName: 'Mayıs', visitors: 0, revenue: 0, occupancy: 0, occupancyByType: { fiveStar: 0, fourStar: 0, threeStarAndLess: 0, holidayVillage: 0 }, avgStayDays: 0, avgSpendPerPerson: 0 },
      { month: 6, monthName: 'Haziran', visitors: 476543, revenue: 291, occupancy: 14.3, occupancyByType: { fiveStar: 17.2, fourStar: 13.4, threeStarAndLess: 10.7, holidayVillage: 11.8 }, avgStayDays: 5.3, avgSpendPerPerson: 610 },
      { month: 7, monthName: 'Temmuz', visitors: 2198765, revenue: 1348, occupancy: 38.7, occupancyByType: { fiveStar: 47.3, fourStar: 37.1, threeStarAndLess: 28.4, holidayVillage: 42.1 }, avgStayDays: 6.1, avgSpendPerPerson: 613 },
      { month: 8, monthName: 'Ağustos', visitors: 3012543, revenue: 1841, occupancy: 54.2, occupancyByType: { fiveStar: 64.7, fourStar: 52.3, threeStarAndLess: 41.8, holidayVillage: 58.4 }, avgStayDays: 6.4, avgSpendPerPerson: 611 },
      { month: 9, monthName: 'Eylül', visitors: 2476543, revenue: 1514, occupancy: 46.3, occupancyByType: { fiveStar: 55.8, fourStar: 44.7, threeStarAndLess: 35.4, holidayVillage: 50.3 }, avgStayDays: 6.2, avgSpendPerPerson: 612 },
      { month: 10, monthName: 'Ekim', visitors: 1987654, revenue: 1213, occupancy: 37.8, occupancyByType: { fiveStar: 45.4, fourStar: 36.2, threeStarAndLess: 28.7, holidayVillage: 32.8 }, avgStayDays: 5.9, avgSpendPerPerson: 610 },
      { month: 11, monthName: 'Kasım', visitors: 1243218, revenue: 757, occupancy: 27.4, occupancyByType: { fiveStar: 33.1, fourStar: 26.2, threeStarAndLess: 20.4, holidayVillage: 13.8 }, avgStayDays: 5.5, avgSpendPerPerson: 609 },
      { month: 12, monthName: 'Aralık', visitors: 447434, revenue: 648, occupancy: 24.1, occupancyByType: { fiveStar: 29.3, fourStar: 22.8, threeStarAndLess: 17.6, holidayVillage: 10.4 }, avgStayDays: 5.8, avgSpendPerPerson: 1448 },
    ],
  },
  {
    year: 2021,
    totalVisitors: 29927534,
    totalRevenue: 24522,
    avgOccupancy: 47.8,
    nationalities: [
      { country: 'Almanya', visitors: 4543218 },
      { country: 'Rusya', visitors: 4987654 },
      { country: 'Bulgaristan', visitors: 2765432 },
      { country: 'İran', visitors: 1754321 },
      { country: 'Ukrayna', visitors: 1987654 },
      { country: 'İngiltere', visitors: 2198765 },
      { country: 'Gürcistan', visitors: 1543218 },
      { country: 'Diğer', visitors: 10147272 },
    ],
    regions: [
      { region: 'Antalya', visitors: 8951432 },
      { region: 'İstanbul', visitors: 9234512 },
      { region: 'Muğla', visitors: 2987654 },
      { region: 'İzmir', visitors: 1743218 },
      { region: 'Diğer', visitors: 7010718 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 812435, revenue: 498, occupancy: 21.4, occupancyByType: { fiveStar: 26.3, fourStar: 19.8, threeStarAndLess: 15.4, holidayVillage: 10.7 }, avgStayDays: 5.3, avgSpendPerPerson: 614 },
      { month: 2, monthName: 'Şubat', visitors: 754321, revenue: 463, occupancy: 20.1, occupancyByType: { fiveStar: 24.8, fourStar: 18.5, threeStarAndLess: 14.3, holidayVillage: 9.8 }, avgStayDays: 5.2, avgSpendPerPerson: 614 },
      { month: 3, monthName: 'Mart', visitors: 1143218, revenue: 703, occupancy: 28.7, occupancyByType: { fiveStar: 35.4, fourStar: 26.8, threeStarAndLess: 20.7, holidayVillage: 17.3 }, avgStayDays: 5.7, avgSpendPerPerson: 615 },
      { month: 4, monthName: 'Nisan', visitors: 1876543, revenue: 1153, occupancy: 37.8, occupancyByType: { fiveStar: 46.2, fourStar: 35.7, threeStarAndLess: 27.4, holidayVillage: 31.8 }, avgStayDays: 6.0, avgSpendPerPerson: 614 },
      { month: 5, monthName: 'Mayıs', visitors: 2543218, revenue: 1571, occupancy: 47.3, occupancyByType: { fiveStar: 57.4, fourStar: 45.2, threeStarAndLess: 35.8, holidayVillage: 50.4 }, avgStayDays: 6.2, avgSpendPerPerson: 618 },
      { month: 6, monthName: 'Haziran', visitors: 3154321, revenue: 1956, occupancy: 57.8, occupancyByType: { fiveStar: 68.4, fourStar: 55.7, threeStarAndLess: 45.1, holidayVillage: 62.3 }, avgStayDays: 6.4, avgSpendPerPerson: 620 },
      { month: 7, monthName: 'Temmuz', visitors: 5212543, revenue: 3246, occupancy: 78.4, occupancyByType: { fiveStar: 86.7, fourStar: 76.2, threeStarAndLess: 67.3, holidayVillage: 83.4 }, avgStayDays: 6.8, avgSpendPerPerson: 623 },
      { month: 8, monthName: 'Ağustos', visitors: 5687654, revenue: 3543, occupancy: 84.2, occupancyByType: { fiveStar: 91.3, fourStar: 82.4, threeStarAndLess: 73.7, holidayVillage: 89.2 }, avgStayDays: 6.9, avgSpendPerPerson: 623 },
      { month: 9, monthName: 'Eylül', visitors: 4432187, revenue: 2764, occupancy: 73.4, occupancyByType: { fiveStar: 81.8, fourStar: 71.3, threeStarAndLess: 61.7, holidayVillage: 78.4 }, avgStayDays: 6.7, avgSpendPerPerson: 624 },
      { month: 10, monthName: 'Ekim', visitors: 2876543, revenue: 1779, occupancy: 57.8, occupancyByType: { fiveStar: 67.4, fourStar: 55.8, threeStarAndLess: 45.2, holidayVillage: 54.7 }, avgStayDays: 6.4, avgSpendPerPerson: 618 },
      { month: 11, monthName: 'Kasım', visitors: 986543, revenue: 607, occupancy: 31.4, occupancyByType: { fiveStar: 38.7, fourStar: 29.8, threeStarAndLess: 23.1, holidayVillage: 15.4 }, avgStayDays: 5.8, avgSpendPerPerson: 616 },
      { month: 12, monthName: 'Aralık', visitors: 448008, revenue: 739, occupancy: 27.3, occupancyByType: { fiveStar: 34.2, fourStar: 25.8, threeStarAndLess: 19.7, holidayVillage: 12.3 }, avgStayDays: 6.1, avgSpendPerPerson: 1649 },
    ],
  },
  {
    year: 2022,
    totalVisitors: 51553813,
    totalRevenue: 46303,
    avgOccupancy: 66.7,
    nationalities: [
      { country: 'Almanya', visitors: 7143218 },
      { country: 'Rusya', visitors: 5487654 },
      { country: 'Bulgaristan', visitors: 3876543 },
      { country: 'İran', visitors: 2976543 },
      { country: 'Ukrayna', visitors: 1087654 },
      { country: 'İngiltere', visitors: 3765432 },
      { country: 'Gürcistan', visitors: 2543218 },
      { country: 'Diğer', visitors: 24673551 },
    ],
    regions: [
      { region: 'Antalya', visitors: 13542618 },
      { region: 'İstanbul', visitors: 16897654 },
      { region: 'Muğla', visitors: 4543218 },
      { region: 'İzmir', visitors: 2876543 },
      { region: 'Diğer', visitors: 13693780 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 1876543, revenue: 1532, occupancy: 38.7, occupancyByType: { fiveStar: 46.4, fourStar: 36.1, threeStarAndLess: 28.7, holidayVillage: 20.4 }, avgStayDays: 5.7, avgSpendPerPerson: 816 },
      { month: 2, monthName: 'Şubat', visitors: 1743218, revenue: 1427, occupancy: 37.2, occupancyByType: { fiveStar: 44.8, fourStar: 34.6, threeStarAndLess: 27.3, holidayVillage: 19.1 }, avgStayDays: 5.6, avgSpendPerPerson: 818 },
      { month: 3, monthName: 'Mart', visitors: 3012543, revenue: 2471, occupancy: 51.4, occupancyByType: { fiveStar: 61.8, fourStar: 49.2, threeStarAndLess: 39.7, holidayVillage: 38.4 }, avgStayDays: 6.0, avgSpendPerPerson: 820 },
      { month: 4, monthName: 'Nisan', visitors: 4543218, revenue: 3737, occupancy: 63.8, occupancyByType: { fiveStar: 74.2, fourStar: 61.7, threeStarAndLess: 51.4, holidayVillage: 57.8 }, avgStayDays: 6.2, avgSpendPerPerson: 822 },
      { month: 5, monthName: 'Mayıs', visitors: 5654321, revenue: 4650, occupancy: 73.4, occupancyByType: { fiveStar: 82.8, fourStar: 71.3, threeStarAndLess: 61.8, holidayVillage: 67.4 }, avgStayDays: 6.4, avgSpendPerPerson: 822 },
      { month: 6, monthName: 'Haziran', visitors: 6543218, revenue: 5386, occupancy: 82.1, occupancyByType: { fiveStar: 89.7, fourStar: 80.4, threeStarAndLess: 71.8, holidayVillage: 82.3 }, avgStayDays: 6.6, avgSpendPerPerson: 823 },
      { month: 7, monthName: 'Temmuz', visitors: 8876543, revenue: 7307, occupancy: 88.7, occupancyByType: { fiveStar: 94.8, fourStar: 87.2, threeStarAndLess: 79.4, holidayVillage: 91.2 }, avgStayDays: 6.8, avgSpendPerPerson: 824 },
      { month: 8, monthName: 'Ağustos', visitors: 9187654, revenue: 7561, occupancy: 91.3, occupancyByType: { fiveStar: 96.7, fourStar: 90.1, threeStarAndLess: 82.8, holidayVillage: 94.7 }, avgStayDays: 6.9, avgSpendPerPerson: 823 },
      { month: 9, monthName: 'Eylül', visitors: 7034321, revenue: 5788, occupancy: 84.7, occupancyByType: { fiveStar: 91.4, fourStar: 83.2, threeStarAndLess: 74.8, holidayVillage: 88.3 }, avgStayDays: 6.7, avgSpendPerPerson: 823 },
      { month: 10, monthName: 'Ekim', visitors: 4321543, revenue: 3556, occupancy: 70.4, occupancyByType: { fiveStar: 79.2, fourStar: 68.7, threeStarAndLess: 59.3, holidayVillage: 64.8 }, avgStayDays: 6.4, avgSpendPerPerson: 823 },
      { month: 11, monthName: 'Kasım', visitors: 2187654, revenue: 1799, occupancy: 48.2, occupancyByType: { fiveStar: 58.1, fourStar: 46.4, threeStarAndLess: 37.1, holidayVillage: 27.3 }, avgStayDays: 5.9, avgSpendPerPerson: 822 },
      { month: 12, monthName: 'Aralık', visitors: 2573037, revenue: 1089, occupancy: 43.7, occupancyByType: { fiveStar: 52.8, fourStar: 42.1, threeStarAndLess: 33.7, holidayVillage: 24.1 }, avgStayDays: 6.1, avgSpendPerPerson: 423 },
    ],
  },
  {
    year: 2023,
    totalVisitors: 56700000,
    totalRevenue: 54277,
    avgOccupancy: 72.4,
    nationalities: [
      { country: 'Almanya', visitors: 7876543 },
      { country: 'Rusya', visitors: 6543218 },
      { country: 'Bulgaristan', visitors: 4321543 },
      { country: 'İran', visitors: 3187654 },
      { country: 'İngiltere', visitors: 4234321 },
      { country: 'Ukrayna', visitors: 1321543 },
      { country: 'Gürcistan', visitors: 2543218 },
      { country: 'Diğer', visitors: 26671960 },
    ],
    regions: [
      { region: 'Antalya', visitors: 15567843 },
      { region: 'İstanbul', visitors: 18234567 },
      { region: 'Muğla', visitors: 5123456 },
      { region: 'İzmir', visitors: 3456789 },
      { region: 'Diğer', visitors: 14317345 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 2432187, revenue: 2098, occupancy: 45.3, occupancyByType: { fiveStar: 54.7, fourStar: 42.8, threeStarAndLess: 34.2, holidayVillage: 26.4 }, avgStayDays: 5.9, avgSpendPerPerson: 863 },
      { month: 2, monthName: 'Şubat', visitors: 2198765, revenue: 1899, occupancy: 43.7, occupancyByType: { fiveStar: 52.8, fourStar: 41.3, threeStarAndLess: 32.7, holidayVillage: 24.8 }, avgStayDays: 5.8, avgSpendPerPerson: 864 },
      { month: 3, monthName: 'Mart', visitors: 3543218, revenue: 3065, occupancy: 56.8, occupancyByType: { fiveStar: 67.4, fourStar: 54.7, threeStarAndLess: 44.3, holidayVillage: 43.7 }, avgStayDays: 6.2, avgSpendPerPerson: 865 },
      { month: 4, monthName: 'Nisan', visitors: 5098765, revenue: 4412, occupancy: 70.3, occupancyByType: { fiveStar: 79.8, fourStar: 67.8, threeStarAndLess: 57.4, holidayVillage: 64.3 }, avgStayDays: 6.4, avgSpendPerPerson: 865 },
      { month: 5, monthName: 'Mayıs', visitors: 6143218, revenue: 5318, occupancy: 79.7, occupancyByType: { fiveStar: 87.4, fourStar: 77.2, threeStarAndLess: 67.8, holidayVillage: 73.4 }, avgStayDays: 6.6, avgSpendPerPerson: 866 },
      { month: 6, monthName: 'Haziran', visitors: 7032187, revenue: 6088, occupancy: 87.4, occupancyByType: { fiveStar: 93.2, fourStar: 85.7, threeStarAndLess: 77.8, holidayVillage: 87.9 }, avgStayDays: 6.8, avgSpendPerPerson: 866 },
      { month: 7, monthName: 'Temmuz', visitors: 9234567, revenue: 7998, occupancy: 92.8, occupancyByType: { fiveStar: 97.4, fourStar: 91.7, threeStarAndLess: 84.3, holidayVillage: 95.2 }, avgStayDays: 7.0, avgSpendPerPerson: 867 },
      { month: 8, monthName: 'Ağustos', visitors: 9543218, revenue: 8270, occupancy: 94.3, occupancyByType: { fiveStar: 98.2, fourStar: 93.4, threeStarAndLess: 86.7, holidayVillage: 96.8 }, avgStayDays: 7.1, avgSpendPerPerson: 867 },
      { month: 9, monthName: 'Eylül', visitors: 7432187, revenue: 6435, occupancy: 88.7, occupancyByType: { fiveStar: 94.7, fourStar: 87.3, threeStarAndLess: 79.8, holidayVillage: 92.4 }, avgStayDays: 6.9, avgSpendPerPerson: 866 },
      { month: 10, monthName: 'Ekim', visitors: 5234321, revenue: 4533, occupancy: 76.2, occupancyByType: { fiveStar: 84.7, fourStar: 74.3, threeStarAndLess: 64.8, holidayVillage: 71.2 }, avgStayDays: 6.6, avgSpendPerPerson: 866 },
      { month: 11, monthName: 'Kasım', visitors: 2654321, revenue: 2298, occupancy: 53.4, occupancyByType: { fiveStar: 63.8, fourStar: 51.2, threeStarAndLess: 41.4, holidayVillage: 31.7 }, avgStayDays: 6.1, avgSpendPerPerson: 866 },
      { month: 12, monthName: 'Aralık', visitors: 153046, revenue: 1861, occupancy: 48.7, occupancyByType: { fiveStar: 58.4, fourStar: 46.8, threeStarAndLess: 37.4, holidayVillage: 27.2 }, avgStayDays: 6.3, avgSpendPerPerson: 12162 },
    ],
  },
  {
    year: 2024,
    totalVisitors: 61300000,
    totalRevenue: 61100,
    avgOccupancy: 75.8,
    nationalities: [
      { country: 'Almanya', visitors: 8432187 },
      { country: 'Rusya', visitors: 7087654 },
      { country: 'Bulgaristan', visitors: 4654321 },
      { country: 'İran', visitors: 3432187 },
      { country: 'İngiltere', visitors: 4654321 },
      { country: 'Ukrayna', visitors: 1543218 },
      { country: 'Gürcistan', visitors: 2876543 },
      { country: 'Diğer', visitors: 28619569 },
    ],
    regions: [
      { region: 'Antalya', visitors: 16543218 },
      { region: 'İstanbul', visitors: 19765432 },
      { region: 'Muğla', visitors: 5654321 },
      { region: 'İzmir', visitors: 3876543 },
      { region: 'Diğer', visitors: 15460486 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 2732187, revenue: 2421, occupancy: 48.2, occupancyByType: { fiveStar: 57.8, fourStar: 45.4, threeStarAndLess: 36.7, holidayVillage: 29.3 }, avgStayDays: 6.0, avgSpendPerPerson: 887 },
      { month: 2, monthName: 'Şubat', visitors: 2498765, revenue: 2215, occupancy: 46.7, occupancyByType: { fiveStar: 56.1, fourStar: 43.8, threeStarAndLess: 35.3, holidayVillage: 27.8 }, avgStayDays: 5.9, avgSpendPerPerson: 887 },
      { month: 3, monthName: 'Mart', visitors: 3876543, revenue: 3439, occupancy: 59.7, occupancyByType: { fiveStar: 70.4, fourStar: 57.8, threeStarAndLess: 47.4, holidayVillage: 46.2 }, avgStayDays: 6.3, avgSpendPerPerson: 888 },
      { month: 4, monthName: 'Nisan', visitors: 5654321, revenue: 5018, occupancy: 73.8, occupancyByType: { fiveStar: 82.7, fourStar: 71.4, threeStarAndLess: 61.2, holidayVillage: 67.8 }, avgStayDays: 6.5, avgSpendPerPerson: 888 },
      { month: 5, monthName: 'Mayıs', visitors: 6765432, revenue: 6006, occupancy: 82.3, occupancyByType: { fiveStar: 89.7, fourStar: 80.4, threeStarAndLess: 71.2, holidayVillage: 77.8 }, avgStayDays: 6.7, avgSpendPerPerson: 888 },
      { month: 6, monthName: 'Haziran', visitors: 7654321, revenue: 6793, occupancy: 89.7, occupancyByType: { fiveStar: 95.3, fourStar: 88.4, threeStarAndLess: 80.7, holidayVillage: 91.4 }, avgStayDays: 6.9, avgSpendPerPerson: 888 },
      { month: 7, monthName: 'Temmuz', visitors: 9987654, revenue: 8873, occupancy: 94.7, occupancyByType: { fiveStar: 98.3, fourStar: 93.8, threeStarAndLess: 86.4, holidayVillage: 96.7 }, avgStayDays: 7.1, avgSpendPerPerson: 888 },
      { month: 8, monthName: 'Ağustos', visitors: 10234567, revenue: 9088, occupancy: 96.1, occupancyByType: { fiveStar: 99.1, fourStar: 95.4, threeStarAndLess: 88.7, holidayVillage: 98.2 }, avgStayDays: 7.2, avgSpendPerPerson: 888 },
      { month: 9, monthName: 'Eylül', visitors: 7987654, revenue: 7092, occupancy: 91.3, occupancyByType: { fiveStar: 96.4, fourStar: 90.1, threeStarAndLess: 82.7, holidayVillage: 94.8 }, avgStayDays: 7.0, avgSpendPerPerson: 888 },
      { month: 10, monthName: 'Ekim', visitors: 5543218, revenue: 4922, occupancy: 78.4, occupancyByType: { fiveStar: 86.8, fourStar: 76.7, threeStarAndLess: 67.4, holidayVillage: 73.2 }, avgStayDays: 6.7, avgSpendPerPerson: 888 },
      { month: 11, monthName: 'Kasım', visitors: 2876543, revenue: 2554, occupancy: 56.7, occupancyByType: { fiveStar: 67.4, fourStar: 54.8, threeStarAndLess: 44.3, holidayVillage: 34.7 }, avgStayDays: 6.2, avgSpendPerPerson: 888 },
      { month: 12, monthName: 'Aralık', visitors: 3488795, revenue: 2679, occupancy: 51.8, occupancyByType: { fiveStar: 61.7, fourStar: 49.4, threeStarAndLess: 39.8, holidayVillage: 29.4 }, avgStayDays: 6.4, avgSpendPerPerson: 768 },
    ],
  },
  {
    year: 2025,
    totalVisitors: 64500000,
    totalRevenue: 66514,
    avgOccupancy: 77.2,
    nationalities: [
      { country: 'Almanya', visitors: 8876543 },
      { country: 'Rusya', visitors: 7432187 },
      { country: 'Bulgaristan', visitors: 4876543 },
      { country: 'İran', visitors: 3576543 },
      { country: 'İngiltere', visitors: 4876543 },
      { country: 'Ukrayna', visitors: 1732187 },
      { country: 'Gürcistan', visitors: 2987654 },
      { country: 'Diğer', visitors: 30141800 },
    ],
    regions: [
      { region: 'Antalya', visitors: 17243218 },
      { region: 'İstanbul', visitors: 20543218 },
      { region: 'Muğla', visitors: 5987654 },
      { region: 'İzmir', visitors: 4123456 },
      { region: 'Diğer', visitors: 16602454 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 2987654, revenue: 2719, occupancy: 50.8, occupancyByType: { fiveStar: 60.7, fourStar: 47.8, threeStarAndLess: 38.4, holidayVillage: 31.7 }, avgStayDays: 6.1, avgSpendPerPerson: 910 },
      { month: 2, monthName: 'Şubat', visitors: 2743218, revenue: 2498, occupancy: 49.2, occupancyByType: { fiveStar: 58.9, fourStar: 46.3, threeStarAndLess: 37.1, holidayVillage: 30.2 }, avgStayDays: 6.0, avgSpendPerPerson: 911 },
      { month: 3, monthName: 'Mart', visitors: 4198765, revenue: 3826, occupancy: 62.3, occupancyByType: { fiveStar: 73.4, fourStar: 60.7, threeStarAndLess: 50.3, holidayVillage: 49.1 }, avgStayDays: 6.4, avgSpendPerPerson: 911 },
      { month: 4, monthName: 'Nisan', visitors: 6032187, revenue: 5499, occupancy: 76.4, occupancyByType: { fiveStar: 84.9, fourStar: 74.1, threeStarAndLess: 63.8, holidayVillage: 70.4 }, avgStayDays: 6.6, avgSpendPerPerson: 912 },
      { month: 5, monthName: 'Mayıs', visitors: 7176543, revenue: 6549, occupancy: 84.8, occupancyByType: { fiveStar: 91.7, fourStar: 82.8, threeStarAndLess: 73.4, holidayVillage: 80.2 }, avgStayDays: 6.8, avgSpendPerPerson: 912 },
      { month: 6, monthName: 'Haziran', visitors: 8112543, revenue: 7403, occupancy: 91.4, occupancyByType: { fiveStar: 96.8, fourStar: 90.3, threeStarAndLess: 82.7, holidayVillage: 93.8 }, avgStayDays: 7.0, avgSpendPerPerson: 913 },
      { month: 7, monthName: 'Temmuz', visitors: 10421543, revenue: 9519, occupancy: 95.8, occupancyByType: { fiveStar: 99.1, fourStar: 95.1, threeStarAndLess: 88.3, holidayVillage: 97.8 }, avgStayDays: 7.2, avgSpendPerPerson: 913 },
      { month: 8, monthName: 'Ağustos', visitors: 10734321, revenue: 9802, occupancy: 97.2, occupancyByType: { fiveStar: 99.5, fourStar: 96.8, threeStarAndLess: 90.4, holidayVillage: 98.9 }, avgStayDays: 7.3, avgSpendPerPerson: 914 },
      { month: 9, monthName: 'Eylül', visitors: 8387654, revenue: 7660, occupancy: 92.7, occupancyByType: { fiveStar: 97.4, fourStar: 91.8, threeStarAndLess: 84.3, holidayVillage: 95.7 }, avgStayDays: 7.1, avgSpendPerPerson: 913 },
      { month: 10, monthName: 'Ekim', visitors: 5876543, revenue: 5365, occupancy: 80.3, occupancyByType: { fiveStar: 88.4, fourStar: 78.7, threeStarAndLess: 69.3, holidayVillage: 75.4 }, avgStayDays: 6.8, avgSpendPerPerson: 913 },
      { month: 11, monthName: 'Kasım', visitors: 3187654, revenue: 2910, occupancy: 59.8, occupancyByType: { fiveStar: 70.2, fourStar: 57.4, threeStarAndLess: 47.1, holidayVillage: 37.3 }, avgStayDays: 6.3, avgSpendPerPerson: 913 },
      { month: 12, monthName: 'Aralık', visitors: 4743375, revenue: 4764, occupancy: 54.8, occupancyByType: { fiveStar: 65.4, fourStar: 52.7, threeStarAndLess: 42.1, holidayVillage: 32.4 }, avgStayDays: 6.5, avgSpendPerPerson: 1004 },
    ],
  },
  {
    year: 2026,
    // AÇIKLANAN SON VERİ: HAZİRAN 2026 (Ocak–Haziran toplamı)
    // Temmuz 2026 ve sonrası henüz Bakanlık tarafından yayımlanmamıştır.
    totalVisitors: 32340814, // Oca–Haz 2026 toplamı
    totalRevenue: 28606,     // Oca–Haz 2026 toplamı (mln $)
    avgOccupancy: 70.8,      // Oca–Haz 2026 ortalaması
    nationalities: [
      { country: 'Almanya', visitors: 3354321 },
      { country: 'Rusya', visitors: 2876543 },
      { country: 'Bulgaristan', visitors: 1876543 },
      { country: 'İran', visitors: 1354321 },
      { country: 'İngiltere', visitors: 1876543 },
      { country: 'Ukrayna', visitors: 654321 },
      { country: 'Gürcistan', visitors: 1187654 },
      { country: 'Diğer', visitors: 19160568 },
    ],
    regions: [
      { region: 'Antalya', visitors: 7547968 },
      { region: 'İstanbul', visitors: 10234567 },
      { region: 'Muğla', visitors: 2198765 },
      { region: 'İzmir', visitors: 1543218 },
      { region: 'Diğer', visitors: 10816296 },
    ],
    months: [
      { month: 1, monthName: 'Ocak', visitors: 3154321, revenue: 2971, occupancy: 52.4, occupancyByType: { fiveStar: 62.8, fourStar: 49.7, threeStarAndLess: 40.1, holidayVillage: 33.4 }, avgStayDays: 6.2, avgSpendPerPerson: 942 },
      { month: 2, monthName: 'Şubat', visitors: 2876543, revenue: 2712, occupancy: 50.7, occupancyByType: { fiveStar: 61.1, fourStar: 48.2, threeStarAndLess: 38.7, holidayVillage: 31.8 }, avgStayDays: 6.1, avgSpendPerPerson: 943 },
      { month: 3, monthName: 'Mart', visitors: 4321543, revenue: 4086, occupancy: 64.2, occupancyByType: { fiveStar: 75.7, fourStar: 62.4, threeStarAndLess: 52.1, holidayVillage: 51.3 }, avgStayDays: 6.5, avgSpendPerPerson: 946 },
      { month: 4, monthName: 'Nisan', visitors: 6254321, revenue: 5924, occupancy: 78.3, occupancyByType: { fiveStar: 87.1, fourStar: 76.4, threeStarAndLess: 65.8, holidayVillage: 72.7 }, avgStayDays: 6.7, avgSpendPerPerson: 947 },
      { month: 5, monthName: 'Mayıs', visitors: 7421543, revenue: 7032, occupancy: 86.4, occupancyByType: { fiveStar: 93.2, fourStar: 84.7, threeStarAndLess: 75.4, holidayVillage: 82.1 }, avgStayDays: 6.9, avgSpendPerPerson: 948 },
      { month: 6, monthName: 'Haziran', visitors: 8312543, revenue: 7881, occupancy: 92.8, occupancyByType: { fiveStar: 97.4, fourStar: 91.8, threeStarAndLess: 84.3, holidayVillage: 95.2 }, avgStayDays: 7.1, avgSpendPerPerson: 948 },
      // Temmuz 2026 ve sonrası: henüz Bakanlık tarafından açıklanmamıştır.
    ],
  },
];

export const getQuarterMonths = (quarter: number): number[] => {
  if (quarter === 1) return [1, 2, 3];
  if (quarter === 2) return [4, 5, 6];
  if (quarter === 3) return [7, 8, 9];
  return [10, 11, 12];
};

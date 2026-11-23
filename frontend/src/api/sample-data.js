const SAMPLE_REGISTRATIONS = [
  { id: "3f2c9a1e-0001", registrationNumber: "CS27-0001", registrationDate: "2027-02-10T08:30:00Z", participantName: "Juan Dela Cruz", contactNumber: "09171234567", email: "juan@example.com", address: "123 Rizal St., Naga City", carMakeModel: "Toyota Supra MK4", plateNumber: "ABC 1234", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 1000.00, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0002", registrationNumber: "CS27-0002", registrationDate: "2027-02-10T09:15:00Z", participantName: "Maria Clara Santos", contactNumber: "09182345678", email: "maria.santos@example.com", address: "45 Magsaysay Ave., Sorsogon City", carMakeModel: "Honda Civic Type R FK8", plateNumber: "XYZ 5678", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0003", registrationNumber: "CS27-0003", registrationDate: "2027-02-10T10:00:00Z", participantName: "Jose Rizalina", contactNumber: "09193456789", email: "jose.r@example.com", address: "78 Penafrancia Ave., Legazpi City", carMakeModel: "Nissan GT-R R35", plateNumber: "GTR 2027", registrationType: "VIP", status: "Confirmed", registrationFee: 5000.00, amountPaid: 2500.00, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0004", registrationNumber: "CS27-0004", registrationDate: "2027-02-10T11:20:00Z", participantName: "Andres Bonifacio Jr.", contactNumber: "09204567890", email: "andres.b@example.com", address: "12 Katipunan St., Gubat, Sorsogon", carMakeModel: "Mazda RX-7 FD3S", plateNumber: "RX7 9012", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0005", registrationNumber: "CS27-0005", registrationDate: "2027-02-11T08:45:00Z", participantName: "Gabriela Silang", contactNumber: "09215678901", email: "gab.silang@example.com", address: "89 Burgos St., Irosin, Sorsogon", carMakeModel: "Subaru WRX STI", plateNumber: "SUB 3456", registrationType: "Exhibitor", status: "CheckedIn", registrationFee: 1500.00, amountPaid: 1500.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0006", registrationNumber: "CS27-0006", registrationDate: "2027-02-11T09:30:00Z", participantName: "Antonio Luna", contactNumber: "09226789012", email: "gen.luna@example.com", address: "34 Del Pilar St., Bulan, Sorsogon", carMakeModel: "Mitsubishi Lancer Evo IX", plateNumber: "EVO 7890", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0007", registrationNumber: "CS27-0007", registrationDate: "2027-02-11T13:10:00Z", participantName: "Melchora Aquino", contactNumber: "09237890123", email: "tandang.sora@example.com", address: "56 Quezon Blvd., Sorsogon City", carMakeModel: "Toyota GR86", plateNumber: "GR8 1122", registrationType: "Exhibitor", status: "Cancelled", registrationFee: 1500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0008", registrationNumber: "CS27-0008", registrationDate: "2027-02-11T14:50:00Z", participantName: "Emilio Aguinaldo", contactNumber: "09248901234", email: "emilio.a@example.com", address: "90 Mabini St., Juban, Sorsogon", carMakeModel: "Ford Mustang GT", plateNumber: "MUS 3344", registrationType: "VIP", status: "Confirmed", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0009", registrationNumber: "CS27-0009", registrationDate: "2027-02-12T08:05:00Z", participantName: "Apolinario Mabini", contactNumber: "09259012345", email: "a.mabini@example.com", address: "11 Bonifacio Ave., Casiguran, Sorsogon", carMakeModel: "BMW M3 Competition", plateNumber: "BMW 5566", registrationType: "VIP", status: "Pending", registrationFee: 5000.00, amountPaid: 1000.00, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0010", registrationNumber: "CS27-0010", registrationDate: "2027-02-12T10:15:00Z", participantName: "Marcelo H. Del Pilar", contactNumber: "09260123456", email: "plaridel@example.com", address: "22 Luna St., Barcelona, Sorsogon", carMakeModel: "Honda S2000", plateNumber: "S2K 7788", registrationType: "Competitor", status: "CheckedIn", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0011", registrationNumber: "CS27-0011", registrationDate: "2027-02-12T11:40:00Z", participantName: "Gregorio Del Pilar", contactNumber: "09271234567", email: "goyo.dp@example.com", address: "67 Rizal St., Pilar, Sorsogon", carMakeModel: "Toyota AE86 Trueno", plateNumber: "AE8 9900", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 1500.00, amountPaid: 1500.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0012", registrationNumber: "CS27-0012", registrationDate: "2027-02-12T15:25:00Z", participantName: "Teresa Magbanua", contactNumber: "09282345678", email: "teresa.m@example.com", address: "88 Roxas Ave., Castilla, Sorsogon", carMakeModel: "Porsche 911 Carrera", plateNumber: "POR 1212", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0013", registrationNumber: "CS27-0013", registrationDate: "2027-02-13T09:00:00Z", participantName: "Miguel Malvar", contactNumber: "09293456789", email: "m.malvar@example.com", address: "14 Osmena St., Donsol, Sorsogon", carMakeModel: "Chevrolet Camaro SS", plateNumber: "CAM 3434", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0014", registrationNumber: "CS27-0014", registrationDate: "2027-02-13T10:30:00Z", participantName: "Diego Silang", contactNumber: "09304567890", email: "diego.s@example.com", address: "55 Zamora St., Matnog, Sorsogon", carMakeModel: "Nissan Silvia S15", plateNumber: "S15 5656", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 1500.00, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0015", registrationNumber: "CS27-0015", registrationDate: "2027-02-13T12:15:00Z", participantName: "Juan Luna", contactNumber: "09315678901", email: "juan.luna@example.com", address: "77 Gomez St., Santa Magdalena, Sorsogon", carMakeModel: "Mazda MX-5 Miata", plateNumber: "MX5 7878", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 1500.00, amountPaid: 1500.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0016", registrationNumber: "CS27-0016", registrationDate: "2027-02-13T14:00:00Z", participantName: "Graciano Lopez Jaena", contactNumber: "09326789012", email: "g.jaena@example.com", address: "99 Burgos St., Prieto Diaz, Sorsogon", carMakeModel: "Volkswagen Golf R", plateNumber: "VWR 9090", registrationType: "Exhibitor", status: "Cancelled", registrationFee: 1500.00, amountPaid: 500.00, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0017", registrationNumber: "CS27-0017", registrationDate: "2027-02-14T08:20:00Z", participantName: "Mariano Ponce", contactNumber: "09337890123", email: "m.ponce@example.com", address: "19 Magallanes St., Magallanes, Sorsogon", carMakeModel: "Audi RS3", plateNumber: "AUD 1313", registrationType: "VIP", status: "Confirmed", registrationFee: 5000.00, amountPaid: 3000.00, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0018", registrationNumber: "CS27-0018", registrationDate: "2027-02-14T09:45:00Z", participantName: "Jose Palma", contactNumber: "09348901234", email: "jose.palma@example.com", address: "28 Aguinaldo St., Sorsogon City", carMakeModel: "Toyota GR Yaris", plateNumber: "YAR 1414", registrationType: "Competitor", status: "CheckedIn", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0019", registrationNumber: "CS27-0019", registrationDate: "2027-02-14T11:10:00Z", participantName: "Leona Florentino", contactNumber: "09359012345", email: "leona.f@example.com", address: "37 Silang St., Sorsogon City", carMakeModel: "Mini Cooper JCW", plateNumber: "JCW 1515", registrationType: "Exhibitor", status: "Pending", registrationFee: 1500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0020", registrationNumber: "CS27-0020", registrationDate: "2027-02-14T13:50:00Z", participantName: "Francisco Balagtas", contactNumber: "09360123456", email: "f.balagtas@example.com", address: "46 Laurel St., Naga City", carMakeModel: "Dodge Challenger R/T", plateNumber: "DOD 1616", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0021", registrationNumber: "CS27-0021", registrationDate: "2027-02-15T08:40:00Z", participantName: "Pedro Paterno", contactNumber: "09371234567", email: "p.paterno@example.com", address: "64 Taft Ave., Legazpi City", carMakeModel: "Lexus RC F", plateNumber: "LEX 1717", registrationType: "VIP", status: "Cancelled", registrationFee: 5000.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0022", registrationNumber: "CS27-0022", registrationDate: "2027-02-15T10:05:00Z", participantName: "Trinidad Tecson", contactNumber: "09382345678", email: "t.tecson@example.com", address: "73 Quirino Hwy., Sorsogon City", carMakeModel: "Honda Integra Type R DC2", plateNumber: "DC2 1818", registrationType: "Competitor", status: "CheckedIn", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0023", registrationNumber: "CS27-0023", registrationDate: "2027-02-15T11:55:00Z", participantName: "Macario Sakay", contactNumber: "09393456789", email: "m.sakay@example.com", address: "82 Jacinto St., Gubat, Sorsogon", carMakeModel: "Nissan 370Z Nismo", plateNumber: "370 1919", registrationType: "Exhibitor", status: "Pending", registrationFee: 1500.00, amountPaid: 750.00, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0024", registrationNumber: "CS27-0024", registrationDate: "2027-02-15T14:30:00Z", participantName: "Artemio Ricarte", contactNumber: "09404567890", email: "a.ricarte@example.com", address: "91 Mabini St., Sorsogon City", carMakeModel: "Hyundai Elantra N", plateNumber: "ELN 2020", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 1500.00, amountPaid: 1500.00, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0025", registrationNumber: "CS27-0025", registrationDate: "2027-02-15T16:00:00Z", participantName: "Pio Valenzuela", contactNumber: "09415678901", email: "pio.v@example.com", address: "105 Rizal Ave., Sorsogon City", carMakeModel: "Toyota Chaser JZX100", plateNumber: "JZX 2121", registrationType: "Pending" === "VIP" ? "VIP" : "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 1250.00, paymentStatus: "Partial" }
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getRegistrations({ participantName = '', type = '', status = '', page = 1, pageSize = 10 } = {}) {
  await delay(350); // Simulates network latency so loading states are visible

  let filtered = [...SAMPLE_REGISTRATIONS];

  if (participantName.trim()) {
    const query = participantName.toLowerCase();
    filtered = filtered.filter((r) => r.participantName.toLowerCase().includes(query));
  }

  if (type) {
    filtered = filtered.filter((r) => r.registrationType === type);
  }

  if (status) {
    filtered = filtered.filter((r) => r.status === status);
  }

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const items = filtered.slice(startIndex, startIndex + pageSize);

  return {
    items,
    page: safePage,
    pageSize,
    totalCount,
    totalPages,
  };
}

export async function getSummary() {
  await delay(250);

  const totalRegistrations = SAMPLE_REGISTRATIONS.length;
  const confirmed = SAMPLE_REGISTRATIONS.filter((r) => r.status === 'Confirmed').length;
  const checkedIn = SAMPLE_REGISTRATIONS.filter((r) => r.status === 'CheckedIn').length;
  const pending = SAMPLE_REGISTRATIONS.filter((r) => r.status === 'Pending').length;
  const cancelled = SAMPLE_REGISTRATIONS.filter((r) => r.status === 'Cancelled').length;

  const totalFees = SAMPLE_REGISTRATIONS.reduce((sum, r) => sum + r.registrationFee, 0);
  const totalPayments = SAMPLE_REGISTRATIONS.reduce((sum, r) => sum + r.amountPaid, 0);
  const uncollectedPayments = totalFees - totalPayments;

  return {
    totalRegistrations,
    confirmed,
    checkedIn,
    pending,
    cancelled,
    totalFees,
    totalPayments,
    uncollectedPayments,
  };
}
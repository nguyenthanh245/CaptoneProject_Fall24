import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  BlobProvider,
  Font,
} from "@react-pdf/renderer";
import { useUserStore } from "../stores/user";
import { sendContract, TCombinedInfoData } from "../services/soc-manager-api";
import { toast } from "sonner";
import { confirmCompleteProject } from "../services/customer-api";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

// Định nghĩa các style
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 14,
    fontFamily: "Roboto",
    lineHeight: 1.8,
    width: "250mm", // Chiều rộng A4
    height: "297mm", // Chiều cao A4
    margin: "auto", // Căn giữa
    border: "1px solid #000", // Khung để dễ hình dung
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  textCenterInherit: {
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
  },
  bold: {
    fontWeight: "bold",
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    flex: 1,
    textAlign: "center",
  },
});

// Tài liệu PDF
const ContractDocument = ({
  statusName,
  dataContract,
}: {
  statusName?: string;
  dataContract: TCombinedInfoData;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
      >
        HỢP ĐỒNG CUNG CẤP DỊCH VỤ KIỂM THỬ BẢO MẬT ỨNG DỤNG
      </Text>

      <View style={styles.section}>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", marginTop: "10px" }}
        >
          Số: …………
        </Text>
        <Text style={styles.textCenterInherit}>
          - Căn cứ Bộ luật Dân sự số 91/2015/QH13 ngày 24/11/2015;
        </Text>
        <Text style={styles.textCenterInherit}>
          - Căn cứ Luật thương mại số 36/2005/QH11 ngày 14/6/2005;
        </Text>
        <Text style={styles.textCenterInherit}>
          - Căn cứ Luật viễn thông số 41/2009/QH12 ngày 23/11/2009;
        </Text>
        <Text style={styles.textCenterInherit}>
          - Căn cứ Luật Giao dịch điện tử số 51/2005/QH11 ngày 29/11/2005;
        </Text>
        <Text style={styles.textCenterInherit}>
          - Căn cứ vào chức năng và nhu cầu của hai bên.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>
          Hôm nay,{" "}
          {new Date().toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          , chúng tôi gồm: {dataContract.pentestRequest.customerName} và
          LynxGuard
        </Text>
        <Text style={[styles.bold, { textDecoration: "underline" }]}>
          Bên sử dụng dịch vụ (Bên A):
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text>Đại diện: {dataContract.pentestRequest.customerName}</Text>
          <Text style={{ marginRight: "100px" }}>Chức vụ: Khách hàng</Text>
        </View>
        <Text>
          Địa chỉ liên hệ: "{dataContract.pentestRequest.customerEmail}"
        </Text>
        <Text>Mã số thuế: {dataContract.pentestRequest.customerTaxCode}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.bold, { textDecoration: "underline" }]}>
          Bên sử dụng dịch vụ (Bên B):
        </Text>
        <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
          TRUNG TÂM SOC – LYNX GUARD
        </Text>
        <Text>Đại diện: Ông Trần Anh Tuấn </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text>Chức vụ: </Text>
          <Text style={{ fontWeight: "bold" }}> Giám đốc công nghệ</Text>
        </View>
        <Text>Theo văn bản ủy quyền số : xxx ngày 01/01/2023</Text>
        <Text>
          Số GPKD: XXXXX Cấp ngày 06/04/2012 tại: Sở KH & ĐT TP. Hà Nội
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text>Tổng đài hỗ trợ: </Text>
          <Text style={{ fontWeight: "bold" }}>1900-6134</Text>
        </View>
        <Text>
          Tài khoản (VNĐ): XXXXX Tại Ngân hàng TMCP Tiên Phong – Hội Sở{" "}
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          Cùng thoả thuận ký kết hợp đồng cung cấp và sử dụng dịch vụ điện tử
          gồm những điều khoản dưới đây:{" "}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: "15px", fontWeight: "bold" }}>
          ĐIỀU 1: CÁC ĐỊNH NGHĨA VÀ DIỄN GIẢI{" "}
        </Text>
        <Text style={{ marginLeft: "15px" }}>
          Dịch vụ giá trị gia tăng về giao dịch điện tử trong lĩnh vực BHXH (
          dịch vụ LYNX GUARD) là dịch vụ nhận, truyền, lưu trữ,phục hồi thông
          điệp dữ liệu giao dịch điện tử trong lĩnh vực BHXH giữa cơ quan, tổ
          chức, cá nhân tham gia giao dịch điện tử trong lĩnh vực BHXH và cơ
          quan Bảo hiểm xã hội để thực hiện giao dịch bằng phương tiện điện tử.
        </Text>
        <Text>
          - “Bên cung cấp dịch vụ” là Công Ty LYNX GUARD. Sau đây gọi tắt là Bên
          B
        </Text>
      </View>

      <Text style={{ fontSize: "15px", fontWeight: "bold" }}>
        ĐIỀU 2: NỘI DUNG CÔNG VIỆC{" "}
      </Text>
      <Text style={{ marginLeft: "15px" }}>
        Dự án kiểm tra bảo mật mang tên "
        {dataContract.projects.map((item) => item.name)}" được thực hiện bởi
        khách hàng {dataContract.pentestRequest.customerName} (Mã số thuế:{" "}
        {dataContract.pentestRequest.customerTaxCode}). Mô tả dự án: "
        {dataContract.projects.map((item) => item.description)}", với mục tiêu
        kiểm tra bảo mật cho trang web thương mại điện tử{" "}
        {dataContract.pentestRequest.urls}. Dự án bắt đầu vào{" "}
        {dataContract.projects.map((item) => item.startDate)} và dự kiến hoàn
        thành vào {dataContract.projects.map((item) => item.endDate)}.
      </Text>
      {/* Bảng */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>STT</Text>
          <Text style={styles.tableCellHeader}>Gói sản phẩm, dịch vụ</Text>
          <Text style={styles.tableCellHeader}>Đơn giá</Text>
          <Text style={styles.tableCellHeader}>Thời gian</Text>
          <Text style={styles.tableCellHeader}>Thuế VAT</Text>
          <Text style={styles.tableCellHeader}>Giá trị (VNĐ)</Text>
          <Text style={styles.tableCellHeader}>Trạng thái</Text>
        </View>
        {dataContract.projects.map((item) =>
          item.vulnerabilities.map((vulItem, index) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{index}</Text>
              <Text style={styles.tableCell}>{vulItem.description}</Text>
              <Text style={styles.tableCell}>{vulItem.cost + "0"}</Text>
              <Text style={styles.tableCell}>1/12/2024</Text>
              <Text style={styles.tableCell}>0%</Text>
              <Text style={styles.tableCellHeader}>{vulItem.cost + "0"}</Text>
              <Text style={styles.tableCell}>{vulItem.statusName}</Text>
            </View>
          ))
        )}
        <View style={styles.tableRow}>
          <Text>
            Tổng giá trị:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {dataContract.projects.map((item) => item.totalCost + "0")}
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Text>
          Bên B đảm bảo cung cấp dịch vụ LYNX GUARD cho Bên A với các nội dung
          sau:
        </Text>
        <Text>-{"\u00A0"}Phần mềm hỗ trợ kê khai</Text>
        <Text>- Sử dụng dịch vụ</Text>
        <Text>
          -{"\u00A0"}Được hỗ trợ giao dịch điện tử qua điện thoại XXXXX, email:
          info@fpt.edu.vn hoặc kênh hỗ trợ của Nhà cung cấp dịch vụ LYNX GUARD
        </Text>
      </View>
      <View>
        <Text
          style={{ fontSize: "15px", fontWeight: "bold", marginTop: "15px" }}
        >
          ĐIỀU 3: THỜI HẠN SỬ DỤNG DỊCH VỤ{" "}
        </Text>
        <View style={{ marginLeft: "15px" }}>
          <Text>
            1. Gói dịch vụ sẽ được kích hoạt kể từ ngày{" "}
            {dataContract.projects.map((item) => item.startDate)} (là ngày hết
            hạn của gói dịch vụ đã mua trước đó) nếu Bên A thanh toán đầy đủ phí
            dịch vụ cho Bên B trước ngày ………... Ngược lại gói dịch vụ sẽ được
            kích hoạt kể từ ngày Bên A thanh toán đầy đủ phí dịch vụ cho Bên B
          </Text>
          <Text>
            2. Trong thời hạn của gói dịch vụ Bên A đã đăng ký, việc biến động
            số lượng người lao động sẽ không làm thay đổi phí dịch vụ và gói
            dịch vụ đã đăng ký;
          </Text>
          <Text>
            3. Trước khi hết thời hạn, nếu có nhu cầu Bên A phải thực hiện gia
            hạn để sử dụng tiếp (phí gia hạn căn cứ tại thời điểm gia hạn). Sau
            thời điểm hết hạn dịch vụ, Bên A không thể giao dịch điện tử với cơ
            quan BHXH.
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{ fontSize: "15px", fontWeight: "bold", marginTop: "15px" }}
        >
          ĐIỀU 4: PHÍ DỊCH VỤ VÀ PHƯƠNG THỨC THANH TOÁN
        </Text>
        <View style={{ marginLeft: "15px" }}>
          {" "}
          <Text>
            1. Tổng phí dịch vụ:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {dataContract.projects.map((item) => item.totalCost + "0")}
            </Text>{" "}
            đồng (sản phẩm không chịu thuế VAT theo quy định của Nhà nước).
            (Bằng chữ : ………………………………. đồng)
          </Text>
          <Text>
            2. Phương thức thanh toán: Bên A thanh toán một lần cho Bên B ngay
            sau khi Bên A đăng ký sử dụng dịch vụ hoặc sau khi hai bên ký hợp
            đồng ;
          </Text>
          <Text>3. Hình thức thanh toán: Chuyển khoản hoặc tiền mặt;</Text>
          <Text>4. Đồng tiền thanh toán: Việt Nam đồng (VNĐ).</Text>
        </View>
      </View>
      <View>
        <Text
          style={{ fontSize: "15px", fontWeight: "bold", marginTop: "15px" }}
        >
          ĐIỀU 5: QUYỀN VÀ NGHĨA VỤ CỦA BÊN A
        </Text>
        <View style={{ marginLeft: "15px" }}>
          <Text>
            1. Bên A có nghĩa vụ cung cấp thông tin đăng ký dịch vụ một cách
            trung thực, chính xác; xuất trình các giấy tờ phục vụ việc cung cấp
            dịch vụ LYNX GUARD; tự chịu trách nhiệm trước pháp luật và thiệt hại
            xảy ra nếu vi phạm quy định này;
          </Text>
          <Text>
            2. Lưu trữ và sử dụng thông tin tài khoản giao dịch điện tử của mình
            một cách an toàn, bí mật trong suốt thời gian dịch vụ LYNX GUARD có
            hiệu lực; không tự ý bẻ khóa, chỉnh sửa các phần mềm được cung cấp;
          </Text>
          <Text>
            3. Thông báo ngay cho Bên B nếu phát hiện thấy dấu hiệu tài khoản
            của mình đã bị lộ hoặc sử dụng trái phép để có các biện pháp xử lý;
          </Text>
          <Text>
            4. Bên A hoàn toàn chịu trách nhiệm trước pháp luật về mọi thiệt hại
            xảy ra nếu vi phạm quy định tại khoản 5.2 và khoản 5.3 của Điều này;
          </Text>
          <Text>
            5. Bên A có quyền yêu cầu Bên B cung cấp những thông tin sau:
          </Text>
          <Text>
            - Các nội dung của dịch vụ LYNX GUARD, thời hạn, phí dịch vụ trong
            phạm vi của Hợp đồng;
          </Text>
          <Text>- Thủ tục khiếu nại và giải quyết tranh chấp.</Text>
          <Text>
            6. Bên A có quyền yêu cầu Bên B tạm ngừng hoặc chấm dứt dịch vụ đã
            cung cấp và tự chịu trách nhiệm về yêu cầu đó.
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{ fontSize: "15px", fontWeight: "bold", marginTop: "15px" }}
        >
          ĐIỀU 6: QUYỀN VÀ NGHĨA VỤ BÊN B{" "}
        </Text>
        <View style={{ marginLeft: "15px" }}>
          <Text>
            1. Cung cấp và hướng dẫn đầy đủ các nội dung của dịch vụ được nêu
            tại Điều 2 của hợp đồng;
          </Text>
          <Text>
            2. Cung cấp kênh hỗ trợ Bên Asử dụng dịch vụ trong suốt thời gian
            hợp đồng có hiệu lực;
          </Text>
          <Text>
            3. Thông báo cho bên A gia hạn dịch vụ trong vòng 30 ngày trước ngày
            hết hạn;
          </Text>
          <Text>
            Bên B có nghĩa vụ lưu trữ những thông tin của Bên A một cách an toàn
            và chỉ được sử dụng những thông tin này vào mục đích liên quan đến
            dịch vụ LYNX GUARD, trừ trường hợp thỏa thuận hoặc pháp luật có quy
            định khác;
          </Text>
          <Text>
            4. Đảm bảo chất lượng và tính hợp pháp của dịch vụ Lynx Guard;
          </Text>
          <Text>
            5. Đảm bảo an toàn, bảo mật thông tin của Bên A trong suốt quá trình
            sử dụng dịch vụ;{" "}
          </Text>
          <Text>
            6. Giải quyết những ý kiến, thắc mắc và khiếu nại của Bên A trong
            trường hợp cần thiết;
          </Text>
          <Text>
            7. Trong suốt thời gian tạm ngừng dịch vụ, Nhà cung cấp vẫn phải
            thực hiện các nghĩa vụ liên quan đến lưu trữ bảo mật những thông tin
            của Bên A;{" "}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{ fontSize: "15px", fontWeight: "bold", marginTop: "15px" }}
        >
          ĐIỀU 7: TẠM NGỪNG DỊCH VỤ
        </Text>
        <View style={{ marginLeft: "15px" }}>
          <Text>
            7.1 Dịch vụ cung cấp cho Bên A sẽ tạm ngừng khi xảy ra một trong các
            trường hợp sau:
          </Text>
          <Text>
            - Dịch vụ của Bên A hết thời hạn hiệu lực mà Bên A không đóng phí
            duy trì dịch vụ;
          </Text>
          <Text>
            - Theo yêu cầu của bên A hoặc xảy ra các trường hợp bất khả kháng
            hoặc có yêu cầu từ cơ quan chức năng có thẩm quyền;
          </Text>
          <Text>
            - Khi Bên A yêu cầu bằng văn bản và yêu cầu này đã được Bên B xác
            minh là chính xác;
          </Text>
          <Text>
            - Khi Bên B phát hiện ra bất cứ sai sót nào có ảnh hưởng đến quyền
            lợi của Bên A trong quá trình sử dụng dịch vụ. Đồng thời Bên B sẽ nỗ
            lực khắc phục sai sót cho bên A trong thời gian sớm nhất;
          </Text>
          <Text>
            - Nếu quá thời hạn thanh toán 30 ngày, bên B sẽ tạm dừng dịch vụ.
            Khi có căn cứ tạm dừng dịch vụ; Bên B sẽ tiến hành tạm dừng, đồng
            thời ngay lập tức thông báo cho Bên A và thời hạn của việc tạm dừng.
            Bên B sẽ không chịu bất kỳ trách nhiệm gì về các thiệt hại của Bên A
            khi tạm dừng dịch vụ trong các trường hợp nêu trên.
          </Text>
          <Text>
            7.2 Tài khoản dịch vụ của Bên A sẽ được khôi phục lại khi các căn cứ
            để tạm dừng kết thúc, hoặc thời hạn tạm dừng theo yêu cầu của Bên A
            đã hết.
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{ fontSize: "15px", fontWeight: "bold", marginTop: "15px" }}
        >
          ĐIỀU 8: CHẤM DỨT VÀ THANH LÝ HỢP ĐỒNG
        </Text>
        <View style={{ marginLeft: "15px" }}>
          <Text>1. Hợp đồng này chấm dứt trong các trường hợp sau đây:</Text>
          <Text>- Bên A đăng ký ngừng sử dụng dịch vụ Kiểm thử bảo mật;</Text>
          <Text>
            - Hết thời hạn sử dụng dịch vụ mà Bên A không tiếp tục gia hạn;
          </Text>
          <Text>
            - Do Bên A trong khi sử dụng dịch vụ có hành vi vi phạm pháp luật,
            các thể lệ và quy định về khai thác dịch vụ.
          </Text>
          <Text>- Hai bên thỏa thuận về việc chấm dứt Hợp đồng này</Text>
          <Text>
            2. Trong các trường hợp chấm dứt hợp đồng trên, Bên A sẽ không được
            hoàn trả phí dịch vụ đã thanh toán cho Bên B;{" "}
          </Text>
          <Text>
            3. Hợp đồng được coi là tự động thanh lý khi hai bên hoàn thành
            nghĩa vụ hợp đồng mà không xảy ra tranh chấp.{" "}
          </Text>
        </View>
      </View>
      <View>
        {" "}
        <Text
          style={{ fontSize: "15px", fontWeight: "bold", marginTop: "15px" }}
        >
          ĐIỀU 9: TRÁCH NHIỆM VI PHẠM HỢP ĐỒNG
        </Text>
        <View style={{ marginLeft: "15px" }}>
          <Text>
            {" "}
            Bên nào vi phạm các nghĩa vụ đã cam kết sẽ bị phạt vi phạm hợp đồng.
            Mức phạt do bên bị vi phạm đưa ra căn cứ tính chất, mức độ vi phạm
            và việc khắc phục hậu quả của bên vi phạm.
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{ fontSize: "15px", fontWeight: "bold", marginTop: "15px" }}
        >
          ĐIỀU 10: ĐIỀU KHOẢN CHUNG{" "}
        </Text>
        <View style={{ marginLeft: "15px" }}>
          <Text>1. Hợp đồng này có hiệu lực kể từ ngày ký</Text>
          <Text>
            2. Các vấn đề phát sinh sẽ được hai bên nghiên cứu, trao đổi, thống
            nhất và khi cần thiết sẽ ký các phụ lục bổ sung cho Hợp đồng này;
          </Text>
          <Text>
            3. Mọi tranh chấp phát sinh từ hợp đồng này trước hết phải được các
            bên giải quyết thông qua thương lượng, hòa giải. Nếu không thể
            thương lượng, hòa giải được thì tranh chấp sẽ được giải quyết tại
            Tòa án. Mọi chi phí phát sinh bên thua kiện chịu trách nhiệm chi
            trả.
          </Text>
          <Text>
            4. Các bên cam kết thực hiện nghiêm túc các quy định trong hợp đồng
            này trên tinh thần thiện chí, hợp tác, trung thực và cùng có lợi.
          </Text>
          <Text>
            5. Trong trường hợp bất khả kháng một trong các bên không thể tiếp
            tục thực hiện hợp đồng, các bên cần thảo luận, trao đổi thống nhất
            trên cơ sở pháp luật để có phương án xử lý đảm bảo quyền lợi và
            nghĩa vụ của các bên theo pháp luật hiện hành.
          </Text>
          <Text>
            Hợp đồng này được lập thành 02(hai) bản có giá trị pháp lý như nhau,
            mỗi bên giữ 01(một) bản
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingLeft: "40px",
          paddingRight: "40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "50px",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>ĐẠI DIỆN BÊN A</Text>
          <Text style={{ fontWeight: "bold" }}>
            {statusName == "Completed" && dataContract.pentestRequest.customerName}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>ĐẠI DIỆN BÊN B</Text>
          <Text style={{ fontWeight: "bold" }}>Giám đốc công nghệ</Text>
          <Text style={{ fontWeight: "bold" }}>Trần Anh Tuấn</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Hiển thị PDF
export default function ContractPdf({
  dataContract,
}: {
  dataContract: TCombinedInfoData;
}) {
  const user = useUserStore((state) => state.user);

  const handleAgreeClick = async (projectId?: number) => {
    try {
      if (projectId) {
        await confirmCompleteProject({ projectId });
        window.location.reload();
        toast.success("Signature Successful !");
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleSendContract = async (projectId?: number) => {
    try {
      if (projectId) {
        await sendContract({ projectId });
        window.location.reload();
        toast.success("Send contract success !");
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const statusName = dataContract.projects.find(
    (item) => item.statusName != null
  )?.statusName;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {user?.role == "CUSTOMER" && (
        <div style={{ marginBottom: "20px" }}>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: statusName == "Contract" ? "#4CAF50" : "#d3d3d3", // Màu nền thay đổi khi bị vô hiệu hóa
              color: statusName == "Contract" ? "white" : "#a9a9a9", // Màu chữ thay đổi khi bị vô hiệu hóa
              border: "none",
              borderRadius: "5px",
              cursor: statusName == "Contract" ? "pointer" : "not-allowed", // Trạng thái con trỏ thay đổi
              textTransform: "uppercase",
            }}
            onClick={() => {
              handleAgreeClick(
                dataContract.projects.find((item) => item.id != null)?.id
              );
            }}
            disabled={!!(statusName != "Contract")} // Nút bị vô hiệu hóa nếu isAgreed là false
          >
            Tôi đồng ý
          </button>
          <div className="font-bold text-red-600">
            {statusName == "Contract" &&
              "Bạn sẽ ký vào hợp đồng và chúng tôi sẽ lưu lại bản hợp đồng này"}
            {statusName == "Completed" &&
              "Hợp đồng đã được ký, trạng thái của dự án đã chuyển sang hoàn thành vui lòng thanh toán khi hệ thống tạo hóa đơn"}
          </div>
        </div>
      )}
      {user?.role == "SOCMANAGER" && (
        <div style={{ marginBottom: "20px" }}>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor:
                statusName == "In Progress" ? "#4CAF50" : "#d3d3d3", // Màu nền thay đổi khi bị vô hiệu hóa
              color: statusName == "In Progress" ? "white" : "#a9a9a9", // Màu chữ thay đổi khi bị vô hiệu hóa
              border: "none",
              borderRadius: "5px",
              cursor: statusName == "In Progress" ? "pointer" : "not-allowed", // Trạng thái con trỏ thay đổi
              textTransform: "uppercase",
            }}
            onClick={() => {
              handleSendContract(
                dataContract.projects.find((item) => item.id != null)?.id
              );
            }}
            disabled={!!(statusName != "In Progress")} // Nút bị vô hiệu hóa nếu statusName là false
          >
            Tạo hợp đồng
          </button>
          <div className="font-bold text-red-600">
            {statusName == "In Progress" &&
              "Bạn sẽ kết thúc dự án tại đây và gửi hợp đồng cho khách hàng ký"}
            {statusName == "Contract" &&
              "Hợp đồng đã được gửi cho khách hàng chờ ký"}
            {statusName == "Completed" &&
              "Hợp đồng đã được khách hàng ký, dự án đã hoàn thành"}
          </div>
        </div>
      )}
      <BlobProvider
        document={
          <ContractDocument
            statusName={statusName}
            dataContract={dataContract}
          />
        }
      >
        {({ url }) =>
          url ? ( // Kiểm tra nếu `url` không phải null
            <iframe
              src={url}
              style={{
                width: "210mm",
                height: "297mm",
                border: "none",
                margin: "auto",
              }}
              title="Hợp đồng"
            />
          ) : (
            <p>Đang tạo tài liệu PDF...</p>
          )
        }
      </BlobProvider>
    </div>
  );
}

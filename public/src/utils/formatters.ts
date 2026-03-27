import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

class Formartters {
  formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  maskCurrency(value: string) {
    const v = value.replace(/\D/g, "");
    if (!v) return "";

    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat("pt-BR", options).format(
      parseFloat(v) / 100,
    );

    return "R$ " + result;
  }

  maskPhone(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }

  parseCurrencyToNumber(value: string): number {
    if (!value) return 0;

    const cleanValue = value.replace(/\D/g, "");

    return Number(cleanValue) / 100;
  }

  maskCEP(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  }
  clearMask(value: string) {
    return value.replace(/\D/g, "");
  }

  formatDate(dateString: string) {
    if (!dateString) return "Data não disponível";

    return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  }

  formatOrderId(orderId: number) {
    const formattedId = String(orderId).padStart(2, "0");

    return "ORD - " + formattedId;
  }
}

export const formatters = new Formartters();

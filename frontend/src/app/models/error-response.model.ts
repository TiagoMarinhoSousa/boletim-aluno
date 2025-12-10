export interface ErrorResponse {
  timestamp: string; // Assumindo formato ISO string para LocalDateTime
  status: number;
  error: string; // Razão do status HTTP (ex: "Bad Request", "Not Found")
  message: string; // Mensagem principal do erro
  path: string; // Caminho da requisição que gerou o erro
  fieldErrors?: { [key: string]: string }; // Opcional: para erros de validação de campo
}
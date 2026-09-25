generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  CUSTOMER
  EMPLOYEE
  ADMIN
  SUPPORT
  COMPLIANCE
  KYC_REVIEWER
}

enum UserStatus {
  ACTIVE
  INACTIVE
  PENDING
}

enum KycStatus {
  PENDING
  VERIFIED
  REJECTED
}

enum AccountType {
  CHECKING
  SAVINGS
  INVESTMENT
  BUSINESS
}

enum AccountStatus {
  ACTIVE
  FROZEN
  CLOSED
}

enum TransactionType {
  DEPOSIT
  WITHDRAWAL
  TRANSFER
  FX_CONVERSION
  PAYMENT
}

enum TransactionStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REVERSED
}

enum LedgerEntryType {
  DEBIT
  CREDIT
}

enum BeneficiaryType {
  INDIVIDUAL
  BUSINESS
}

model User {
  id            String       @id @default(cuid())
  email         String       @unique
  firstName     String
  lastName      String
  password      String
  status        UserStatus   @default(ACTIVE)
  role          UserRole     @default(CUSTOMER)
  kycStatus     KycStatus    @default(PENDING)
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  accounts      Account[]
  transactions  Transaction[]
  beneficiaries Beneficiary[]
  auditLogs     AuditLog[]
}

model Account {
  id           String        @id @default(cuid())
  userId       String
  iban         String        @unique
  type         AccountType
  balance      Decimal       @default(0.00) @db.Decimal(18, 2)
  currency     String        @default("USD")
  status       AccountStatus @default(ACTIVE)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  user         User          @relation(fields: [userId], references: [id])
  transactions Transaction[] @relation("AccountTransactions")
  ledgerEntries LedgerEntry[]
  beneficiaries Beneficiary[]
}

model Transaction {
  id             String            @id @default(cuid())
  userId         String?
  fromAccountId  String?
  toAccountId    String?
  amount         Decimal           @db.Decimal(18, 2)
  currency       String            @default("USD")
  type           TransactionType
  status         TransactionStatus @default(PENDING)
  description    String?
  reference      String            @unique @default(cuid())
  idempotencyKey String            @unique @default(cuid())
  channel        String            @default("INTERNAL")
  createdAt      DateTime          @default(now())
  updatedAt      DateTime          @updatedAt
  user           User?             @relation(fields: [userId], references: [id])
  fromAccount    Account?          @relation("AccountTransactions", fields: [fromAccountId], references: [id])
  toAccount      Account?          @relation(fields: [toAccountId], references: [id])
  ledgerEntries  LedgerEntry[]
}

model LedgerEntry {
  id            String        @id @default(cuid())
  accountId     String
  transactionId String?
  type          LedgerEntryType
  amount        Decimal       @db.Decimal(18, 2)
  currency      String        @default("USD")
  description   String
  balanceAfter  Decimal       @db.Decimal(18, 2)
  createdAt     DateTime      @default(now())
  account       Account       @relation(fields: [accountId], references: [id])
  transaction   Transaction?  @relation(fields: [transactionId], references: [id])
}

model Beneficiary {
  id            String          @id @default(cuid())
  userId        String
  accountId     String?
  name          String
  nickname      String?
  bankName      String?
  accountNumber String?
  iban          String?
  country       String?
  beneficiaryType BeneficiaryType @default(INDIVIDUAL)
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  user          User            @relation(fields: [userId], references: [id])
  account       Account?        @relation(fields: [accountId], references: [id])
}

model AuditLog {
  id            String   @id @default(cuid())
  actorId       String?
  action        String
  resourceType  String
  resourceId    String?
  details       Json?
  createdAt     DateTime @default(now())
  actor         User?    @relation(fields: [actorId], references: [id])
}

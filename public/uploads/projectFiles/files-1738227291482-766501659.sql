PGDMP                       }            SpaceDesignAurora-Production #   16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)    16.4    a           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            b           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            c           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            d           1262    16396    SpaceDesignAurora-Production    DATABASE     �   CREATE DATABASE "SpaceDesignAurora-Production" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
 .   DROP DATABASE "SpaceDesignAurora-Production";
                spacedesigndev    false            e           0    0    SCHEMA public    ACL     1   GRANT CREATE ON SCHEMA public TO spacedesigndev;
                   pg_database_owner    false    5            �            1259    17555    Company    TABLE     &  CREATE TABLE public."Company" (
    "CompanyId" bigint NOT NULL,
    "CompanyName" character varying(150) NOT NULL,
    "CompanyAddress" character varying(100) NOT NULL,
    "CompanyEmail" character varying(100) NOT NULL,
    "CompanyPhone" character varying(15),
    "CompanyImageUrl" text
);
    DROP TABLE public."Company";
       public         heap    spacedesigndev    false            �            1259    17558    Company_CompanyId_seq    SEQUENCE     �   CREATE SEQUENCE public."Company_CompanyId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Company_CompanyId_seq";
       public          spacedesigndev    false    221            f           0    0    Company_CompanyId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Company_CompanyId_seq" OWNED BY public."Company"."CompanyId";
          public          spacedesigndev    false    222            �            1259    17559    Contact    TABLE     �  CREATE TABLE public."Contact" (
    "IdContact" integer NOT NULL,
    "FirstName" character varying(50) NOT NULL,
    "LastName" character varying(50) NOT NULL,
    "Email" character varying(100) NOT NULL,
    "Company" character varying(100),
    "IdBudget" integer NOT NULL,
    "IdObject" integer NOT NULL,
    "Message" text,
    "CreatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public."Contact";
       public         heap    spacedesigndev    false            �            1259    17565    ContactBudgetRange    TABLE     z   CREATE TABLE public."ContactBudgetRange" (
    "IdBudget" integer NOT NULL,
    "Range" character varying(50) NOT NULL
);
 (   DROP TABLE public."ContactBudgetRange";
       public         heap    spacedesigndev    false            �            1259    17568    ContactBudgetRange_IdBudget_seq    SEQUENCE     �   CREATE SEQUENCE public."ContactBudgetRange_IdBudget_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."ContactBudgetRange_IdBudget_seq";
       public          spacedesigndev    false    224            g           0    0    ContactBudgetRange_IdBudget_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."ContactBudgetRange_IdBudget_seq" OWNED BY public."ContactBudgetRange"."IdBudget";
          public          spacedesigndev    false    225            �            1259    17569    ContactObject    TABLE     t   CREATE TABLE public."ContactObject" (
    "IdObject" integer NOT NULL,
    "Name" character varying(50) NOT NULL
);
 #   DROP TABLE public."ContactObject";
       public         heap    spacedesigndev    false            �            1259    17572    ContactObject_IdObject_seq    SEQUENCE     �   CREATE SEQUENCE public."ContactObject_IdObject_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."ContactObject_IdObject_seq";
       public          spacedesigndev    false    226            h           0    0    ContactObject_IdObject_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."ContactObject_IdObject_seq" OWNED BY public."ContactObject"."IdObject";
          public          spacedesigndev    false    227            �            1259    17573    Contact_IdContact_seq    SEQUENCE     �   CREATE SEQUENCE public."Contact_IdContact_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Contact_IdContact_seq";
       public          spacedesigndev    false    223            i           0    0    Contact_IdContact_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Contact_IdContact_seq" OWNED BY public."Contact"."IdContact";
          public          spacedesigndev    false    228            �            1259    17574    Conversation    TABLE     �   CREATE TABLE public."Conversation" (
    "ConversationId" bigint NOT NULL,
    "Staffer1Id" bigint,
    "Staffer2Id" bigint,
    "ProjectId" bigint
);
 "   DROP TABLE public."Conversation";
       public         heap    spacedesigndev    false            �            1259    17577    Conversation_ConversationId_seq    SEQUENCE     �   CREATE SEQUENCE public."Conversation_ConversationId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."Conversation_ConversationId_seq";
       public          spacedesigndev    false    229            j           0    0    Conversation_ConversationId_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Conversation_ConversationId_seq" OWNED BY public."Conversation"."ConversationId";
          public          spacedesigndev    false    230            �            1259    17578    Customer    TABLE     e  CREATE TABLE public."Customer" (
    "CustomerId" bigint NOT NULL,
    "CustomerName" character varying(100) NOT NULL,
    "CustomerSurname" character varying(100) NOT NULL,
    "CustomerEmail" character varying(100) NOT NULL,
    "CustomerPhone" character varying(15),
    "CustomerPassword" character varying(250) NOT NULL,
    "CustomerImageUrl" text
);
    DROP TABLE public."Customer";
       public         heap    spacedesigndev    false            �            1259    17583    CustomerCompany    TABLE     m   CREATE TABLE public."CustomerCompany" (
    "CustomerId" bigint NOT NULL,
    "CompanyId" bigint NOT NULL
);
 %   DROP TABLE public."CustomerCompany";
       public         heap    spacedesigndev    false            �            1259    17586    Customer_CustomerId_seq    SEQUENCE     �   CREATE SEQUENCE public."Customer_CustomerId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Customer_CustomerId_seq";
       public          spacedesigndev    false    231            k           0    0    Customer_CustomerId_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Customer_CustomerId_seq" OWNED BY public."Customer"."CustomerId";
          public          spacedesigndev    false    233            �            1259    17587    Group    TABLE     z   CREATE TABLE public."Group" (
    "PermissionGroupId" bigint NOT NULL,
    "GroupName" character varying(250) NOT NULL
);
    DROP TABLE public."Group";
       public         heap    spacedesigndev    false            �            1259    17590    Group_PermissionGroupId_seq    SEQUENCE     �   CREATE SEQUENCE public."Group_PermissionGroupId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Group_PermissionGroupId_seq";
       public          spacedesigndev    false    234            l           0    0    Group_PermissionGroupId_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."Group_PermissionGroupId_seq" OWNED BY public."Group"."PermissionGroupId";
          public          spacedesigndev    false    235            �            1259    17591    Message    TABLE       CREATE TABLE public."Message" (
    "MessageId" bigint NOT NULL,
    "StafferSenderId" bigint NOT NULL,
    "ConversationId" bigint NOT NULL,
    "Date" timestamp(6) with time zone NOT NULL,
    "Text" text NOT NULL,
    "IsCustomer" boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Message";
       public         heap    spacedesigndev    false            �            1259    17597    Message_MessageId_seq    SEQUENCE     �   CREATE SEQUENCE public."Message_MessageId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Message_MessageId_seq";
       public          spacedesigndev    false    236            m           0    0    Message_MessageId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Message_MessageId_seq" OWNED BY public."Message"."MessageId";
          public          spacedesigndev    false    237            �            1259    17598    Notification    TABLE     �   CREATE TABLE public."Notification" (
    "NotificationId" bigint NOT NULL,
    "NotificationMessage" text NOT NULL,
    "NotificationCreationDate" date DEFAULT now() NOT NULL
);
 "   DROP TABLE public."Notification";
       public         heap    spacedesigndev    false            �            1259    17604    NotificationExtraData    TABLE     �   CREATE TABLE public."NotificationExtraData" (
    "NotificationId" bigint NOT NULL,
    "UserId" bigint NOT NULL,
    "IsRead" boolean NOT NULL
);
 +   DROP TABLE public."NotificationExtraData";
       public         heap    spacedesigndev    false            �            1259    17607    NotificationInfo    TABLE     �   CREATE TABLE public."NotificationInfo" (
    "NotificationId" bigint NOT NULL,
    "ProjectId" bigint,
    "StafferId" bigint,
    "CustomerId" bigint,
    "NotificationTypeName" character varying NOT NULL
);
 &   DROP TABLE public."NotificationInfo";
       public         heap    spacedesigndev    false            �            1259    17612    Notification_NotificationId_seq    SEQUENCE     �   CREATE SEQUENCE public."Notification_NotificationId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."Notification_NotificationId_seq";
       public          spacedesigndev    false    238            n           0    0    Notification_NotificationId_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Notification_NotificationId_seq" OWNED BY public."Notification"."NotificationId";
          public          spacedesigndev    false    241            �            1259    16462 
   Permission    TABLE     �   CREATE TABLE public."Permission" (
    "PermissionId" bigint NOT NULL,
    "PermissionName" character varying(250) NOT NULL,
    "PermissionDescription" character varying(300) NOT NULL,
    "PermissionAction" character varying(200)
);
     DROP TABLE public."Permission";
       public         heap    spacedesigndev    false            �            1259    16467    PermissionGroup    TABLE     w   CREATE TABLE public."PermissionGroup" (
    "PermissionId" bigint NOT NULL,
    "PermissionGroupId" bigint NOT NULL
);
 %   DROP TABLE public."PermissionGroup";
       public         heap    spacedesigndev    false            �            1259    16470    Permission_PermissionId_seq    SEQUENCE     �   CREATE SEQUENCE public."Permission_PermissionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Permission_PermissionId_seq";
       public          spacedesigndev    false    215            o           0    0    Permission_PermissionId_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."Permission_PermissionId_seq" OWNED BY public."Permission"."PermissionId";
          public          spacedesigndev    false    217            �            1259    17613    Project    TABLE     �  CREATE TABLE public."Project" (
    "ProjectId" bigint NOT NULL,
    "ProjectName" character varying(200) NOT NULL,
    "ProjectDescription" text,
    "ProjectCreationDate" date DEFAULT CURRENT_DATE NOT NULL,
    "ProjectEndDate" date,
    "ProjectManagerId" bigint,
    "ProjectBannerId" bigint NOT NULL,
    "CompanyId" bigint,
    "StatusId" bigint DEFAULT 1,
    "UniqueCode" uuid DEFAULT gen_random_uuid()
);
    DROP TABLE public."Project";
       public         heap    spacedesigndev    false            �            1259    17621    ProjectBanner    TABLE        CREATE TABLE public."ProjectBanner" (
    "ProjectBannerId" bigint NOT NULL,
    "ProjectBannerPath" character varying(300)
);
 #   DROP TABLE public."ProjectBanner";
       public         heap    spacedesigndev    false            �            1259    17624 !   ProjectBanner_ProjectBannerId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectBanner_ProjectBannerId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."ProjectBanner_ProjectBannerId_seq";
       public          spacedesigndev    false    243            p           0    0 !   ProjectBanner_ProjectBannerId_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."ProjectBanner_ProjectBannerId_seq" OWNED BY public."ProjectBanner"."ProjectBannerId";
          public          spacedesigndev    false    244            �            1259    17625    ProjectFiles    TABLE     �   CREATE TABLE public."ProjectFiles" (
    "ProjectFileId" bigint NOT NULL,
    "FileName" text NOT NULL,
    "FilePath" text NOT NULL,
    "ForClient" boolean DEFAULT false NOT NULL,
    "FolderId" bigint NOT NULL
);
 "   DROP TABLE public."ProjectFiles";
       public         heap    spacedesigndev    false            �            1259    17631    ProjectFiles_ProjectFileId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectFiles_ProjectFileId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public."ProjectFiles_ProjectFileId_seq";
       public          spacedesigndev    false    245            q           0    0    ProjectFiles_ProjectFileId_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."ProjectFiles_ProjectFileId_seq" OWNED BY public."ProjectFiles"."ProjectFileId";
          public          spacedesigndev    false    246            �            1259    17632    ProjectFolder    TABLE     �   CREATE TABLE public."ProjectFolder" (
    "FolderId" bigint NOT NULL,
    "FolderName" character varying NOT NULL,
    "ProjectId" bigint NOT NULL,
    "CustomerVisible" boolean NOT NULL,
    "TeamVisible" boolean NOT NULL,
    "UpFolderId" bigint
);
 #   DROP TABLE public."ProjectFolder";
       public         heap    spacedesigndev    false            �            1259    17637    ProjectFolder_FolderId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectFolder_FolderId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."ProjectFolder_FolderId_seq";
       public          spacedesigndev    false    247            r           0    0    ProjectFolder_FolderId_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."ProjectFolder_FolderId_seq" OWNED BY public."ProjectFolder"."FolderId";
          public          spacedesigndev    false    248            �            1259    17638    ProjectLink    TABLE       CREATE TABLE public."ProjectLink" (
    "ProjectLinkId" bigint NOT NULL,
    "ProjectId" bigint NOT NULL,
    "ProjectLinkTitle" character varying(200) NOT NULL,
    "ProjectLinkUrl" character varying(300) NOT NULL,
    "ProjectLinkTypeId" bigint NOT NULL
);
 !   DROP TABLE public."ProjectLink";
       public         heap    spacedesigndev    false            �            1259    17643    ProjectLinkType    TABLE     �   CREATE TABLE public."ProjectLinkType" (
    "ProjectLinkTypeId" bigint NOT NULL,
    "ProjectLinkTypeName" character varying(200) NOT NULL,
    "ProjectLinkTypeImage" character varying(300) NOT NULL
);
 %   DROP TABLE public."ProjectLinkType";
       public         heap    spacedesigndev    false            �            1259    17648 %   ProjectLinkType_ProjectLinkTypeId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectLinkType_ProjectLinkTypeId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."ProjectLinkType_ProjectLinkTypeId_seq";
       public          spacedesigndev    false    250            s           0    0 %   ProjectLinkType_ProjectLinkTypeId_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public."ProjectLinkType_ProjectLinkTypeId_seq" OWNED BY public."ProjectLinkType"."ProjectLinkTypeId";
          public          spacedesigndev    false    251            �            1259    17649    ProjectLink_ProjectLinkId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectLink_ProjectLinkId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."ProjectLink_ProjectLinkId_seq";
       public          spacedesigndev    false    249            t           0    0    ProjectLink_ProjectLinkId_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."ProjectLink_ProjectLinkId_seq" OWNED BY public."ProjectLink"."ProjectLinkId";
          public          spacedesigndev    false    252            �            1259    17650    ProjectTask    TABLE     �  CREATE TABLE public."ProjectTask" (
    "ProjectTaskId" bigint NOT NULL,
    "ProjectTaskName" character varying(50) NOT NULL,
    "ProjectTaskDescription" text,
    "ProjectTaskExpiration" date,
    "ProjectTaskStatusId" bigint DEFAULT 1 NOT NULL,
    "ProjectId" bigint NOT NULL,
    "ProjectTaskCreation" date DEFAULT now() NOT NULL,
    "IsArchived" boolean DEFAULT false NOT NULL
);
 !   DROP TABLE public."ProjectTask";
       public         heap    spacedesigndev    false            �            1259    17657    ProjectTaskCheckbox    TABLE     �   CREATE TABLE public."ProjectTaskCheckbox" (
    "CheckboxId" bigint NOT NULL,
    "ChecklistId" bigint NOT NULL,
    "IsSelected" boolean DEFAULT false NOT NULL,
    "Text" character varying NOT NULL
);
 )   DROP TABLE public."ProjectTaskCheckbox";
       public         heap    spacedesigndev    false            �            1259    17663 "   ProjectTaskCheckbox_CheckboxId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectTaskCheckbox_CheckboxId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."ProjectTaskCheckbox_CheckboxId_seq";
       public          spacedesigndev    false    254            u           0    0 "   ProjectTaskCheckbox_CheckboxId_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."ProjectTaskCheckbox_CheckboxId_seq" OWNED BY public."ProjectTaskCheckbox"."CheckboxId";
          public          spacedesigndev    false    255                        1259    17664    ProjectTaskChecklist    TABLE     �   CREATE TABLE public."ProjectTaskChecklist" (
    "ChecklistId" bigint NOT NULL,
    "Text" character varying NOT NULL,
    "ProjectTaskId" bigint NOT NULL
);
 *   DROP TABLE public."ProjectTaskChecklist";
       public         heap    spacedesigndev    false                       1259    17669 $   ProjectTaskChecklist_ChecklistId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectTaskChecklist_ChecklistId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."ProjectTaskChecklist_ChecklistId_seq";
       public          spacedesigndev    false    256            v           0    0 $   ProjectTaskChecklist_ChecklistId_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."ProjectTaskChecklist_ChecklistId_seq" OWNED BY public."ProjectTaskChecklist"."ChecklistId";
          public          spacedesigndev    false    257                       1259    17670    ProjectTaskComment    TABLE     �   CREATE TABLE public."ProjectTaskComment" (
    "ProjectTaskId" bigint NOT NULL,
    "StafferId" bigint NOT NULL,
    "Text" character varying NOT NULL,
    "CommentDate" date DEFAULT now() NOT NULL,
    "ProjectTaskCommentId" bigint NOT NULL
);
 (   DROP TABLE public."ProjectTaskComment";
       public         heap    spacedesigndev    false                       1259    17676 ,   ProjectTaskComment_ProjectTaskCommentIId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectTaskComment_ProjectTaskCommentIId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 E   DROP SEQUENCE public."ProjectTaskComment_ProjectTaskCommentIId_seq";
       public          spacedesigndev    false    258            w           0    0 ,   ProjectTaskComment_ProjectTaskCommentIId_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."ProjectTaskComment_ProjectTaskCommentIId_seq" OWNED BY public."ProjectTaskComment"."ProjectTaskCommentId";
          public          spacedesigndev    false    259                       1259    17677    ProjectTaskFiles    TABLE     �   CREATE TABLE public."ProjectTaskFiles" (
    "TaskFileId" bigint NOT NULL,
    "FileName" character varying NOT NULL,
    "FilePath" character varying NOT NULL,
    "TaskId" bigint NOT NULL
);
 &   DROP TABLE public."ProjectTaskFiles";
       public         heap    spacedesigndev    false                       1259    17682    ProjectTaskFiles_TaskFileId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectTaskFiles_TaskFileId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."ProjectTaskFiles_TaskFileId_seq";
       public          spacedesigndev    false    260            x           0    0    ProjectTaskFiles_TaskFileId_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."ProjectTaskFiles_TaskFileId_seq" OWNED BY public."ProjectTaskFiles"."TaskFileId";
          public          spacedesigndev    false    261                       1259    17683    ProjectTaskStatus    TABLE     �   CREATE TABLE public."ProjectTaskStatus" (
    "ProjectTaskStatusId" bigint NOT NULL,
    "ProjectTaskStatusName" character varying(50) NOT NULL
);
 '   DROP TABLE public."ProjectTaskStatus";
       public         heap    spacedesigndev    false                       1259    17686 )   ProjectTaskStatus_ProjectTaskStatusId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectTaskStatus_ProjectTaskStatusId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public."ProjectTaskStatus_ProjectTaskStatusId_seq";
       public          spacedesigndev    false    262            y           0    0 )   ProjectTaskStatus_ProjectTaskStatusId_seq    SEQUENCE OWNED BY     }   ALTER SEQUENCE public."ProjectTaskStatus_ProjectTaskStatusId_seq" OWNED BY public."ProjectTaskStatus"."ProjectTaskStatusId";
          public          spacedesigndev    false    263                       1259    17687    ProjectTaskTag    TABLE     �   CREATE TABLE public."ProjectTaskTag" (
    "ProjectTaskTagId" bigint NOT NULL,
    "ProjectTaskTagName" character varying(50) NOT NULL
);
 $   DROP TABLE public."ProjectTaskTag";
       public         heap    spacedesigndev    false            	           1259    17690 #   ProjectTaskTag_ProjectTaskTagId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectTaskTag_ProjectTaskTagId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."ProjectTaskTag_ProjectTaskTagId_seq";
       public          spacedesigndev    false    264            z           0    0 #   ProjectTaskTag_ProjectTaskTagId_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."ProjectTaskTag_ProjectTaskTagId_seq" OWNED BY public."ProjectTaskTag"."ProjectTaskTagId";
          public          spacedesigndev    false    265            
           1259    17691    ProjectTaskTeam    TABLE     ^   CREATE TABLE public."ProjectTaskTeam" (
    "ProjectTaskId" bigint,
    "StafferId" bigint
);
 %   DROP TABLE public."ProjectTaskTeam";
       public         heap    spacedesigndev    false                       1259    17694    ProjectTask_ProjectTaskId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectTask_ProjectTaskId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."ProjectTask_ProjectTaskId_seq";
       public          spacedesigndev    false    253            {           0    0    ProjectTask_ProjectTaskId_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."ProjectTask_ProjectTaskId_seq" OWNED BY public."ProjectTask"."ProjectTaskId";
          public          spacedesigndev    false    267                       1259    17695    ProjectTasksTags    TABLE     f   CREATE TABLE public."ProjectTasksTags" (
    "ProjectTaskId" bigint,
    "ProjectTaskTagId" bigint
);
 &   DROP TABLE public."ProjectTasksTags";
       public         heap    spacedesigndev    false                       1259    17698    ProjectTeam    TABLE     h   CREATE TABLE public."ProjectTeam" (
    "ProjectId" bigint NOT NULL,
    "StafferId" bigint NOT NULL
);
 !   DROP TABLE public."ProjectTeam";
       public         heap    spacedesigndev    false                       1259    17701    ProjectTicket    TABLE     �  CREATE TABLE public."ProjectTicket" (
    "ProjectTicketId" bigint NOT NULL,
    "ProjectTicketTitle" character varying(150) NOT NULL,
    "ProjectTicketDescription" text NOT NULL,
    "TicketStatusId" bigint DEFAULT 8 NOT NULL,
    "ProjectTicketCreationDate" date DEFAULT now() NOT NULL,
    "ProjectTicketCompletedDate" date,
    "ProjectId" bigint NOT NULL,
    "CustomerId" bigint NOT NULL,
    "TicketRequestTypeId" bigint NOT NULL
);
 #   DROP TABLE public."ProjectTicket";
       public         heap    spacedesigndev    false                       1259    17708 !   ProjectTicket_ProjectTicketId_seq    SEQUENCE     �   CREATE SEQUENCE public."ProjectTicket_ProjectTicketId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."ProjectTicket_ProjectTicketId_seq";
       public          spacedesigndev    false    270            |           0    0 !   ProjectTicket_ProjectTicketId_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."ProjectTicket_ProjectTicketId_seq" OWNED BY public."ProjectTicket"."ProjectTicketId";
          public          spacedesigndev    false    271                       1259    17709    Project_ProjectId_seq    SEQUENCE     �   CREATE SEQUENCE public."Project_ProjectId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Project_ProjectId_seq";
       public          spacedesigndev    false    242            }           0    0    Project_ProjectId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Project_ProjectId_seq" OWNED BY public."Project"."ProjectId";
          public          spacedesigndev    false    272                       1259    17710    ReadContact    TABLE     D  CREATE TABLE public."ReadContact" (
    "IdContact" integer,
    "FirstName" character varying(50),
    "LastName" character varying(50),
    "Email" character varying(100),
    "Company" character varying(100),
    "IdBudget" integer,
    "IdObject" integer,
    "Message" text,
    "CreatedAt" timestamp with time zone
);
 !   DROP TABLE public."ReadContact";
       public         heap    spacedesigndev    false            �            1259    16573    Role    TABLE     �   CREATE TABLE public."Role" (
    "RoleId" bigint NOT NULL,
    "RoleName" character varying(250) NOT NULL,
    "RoleDescription" character varying(250) NOT NULL,
    "RolePriority" bigint NOT NULL
);
    DROP TABLE public."Role";
       public         heap    spacedesigndev    false            �            1259    16578    RolePermission    TABLE     k   CREATE TABLE public."RolePermission" (
    "RoleId" bigint NOT NULL,
    "PermissionId" bigint NOT NULL
);
 $   DROP TABLE public."RolePermission";
       public         heap    spacedesigndev    false            �            1259    16581    Role_RoleId_seq    SEQUENCE     z   CREATE SEQUENCE public."Role_RoleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Role_RoleId_seq";
       public          spacedesigndev    false    218            ~           0    0    Role_RoleId_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Role_RoleId_seq" OWNED BY public."Role"."RoleId";
          public          spacedesigndev    false    220                       1259    17715    Staffer    TABLE     �  CREATE TABLE public."Staffer" (
    "StafferId" bigint NOT NULL,
    "StafferName" character varying(250) NOT NULL,
    "StafferSurname" character varying(250) NOT NULL,
    "StafferEmail" character varying(300) NOT NULL,
    "StafferPhone" character varying(10) NOT NULL,
    "StafferPassword" character varying(500) NOT NULL,
    "StafferImageUrl" text,
    "RecoveryCode" bigint,
    "CreationTime" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public."Staffer";
       public         heap    spacedesigndev    false                       1259    17721    StafferRole    TABLE     e   CREATE TABLE public."StafferRole" (
    "StafferId" bigint NOT NULL,
    "RoleId" bigint NOT NULL
);
 !   DROP TABLE public."StafferRole";
       public         heap    spacedesigndev    false                       1259    17724    Staffer_StafferId_seq    SEQUENCE     �   CREATE SEQUENCE public."Staffer_StafferId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Staffer_StafferId_seq";
       public          spacedesigndev    false    274                       0    0    Staffer_StafferId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Staffer_StafferId_seq" OWNED BY public."Staffer"."StafferId";
          public          spacedesigndev    false    276                       1259    17725    Status    TABLE     �   CREATE TABLE public."Status" (
    "StatusId" bigint NOT NULL,
    "StatusName" character varying(100) NOT NULL,
    "StatusColor" character varying(15) NOT NULL
);
    DROP TABLE public."Status";
       public         heap    spacedesigndev    false                       1259    17728    Status_StatusId_seq    SEQUENCE     ~   CREATE SEQUENCE public."Status_StatusId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Status_StatusId_seq";
       public          spacedesigndev    false    277            �           0    0    Status_StatusId_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Status_StatusId_seq" OWNED BY public."Status"."StatusId";
          public          spacedesigndev    false    278                       1259    17729    TicketRequestType    TABLE     �   CREATE TABLE public."TicketRequestType" (
    "TicketRequestTypeId" bigint NOT NULL,
    "TicketRequestName" character varying
);
 '   DROP TABLE public."TicketRequestType";
       public         heap    spacedesigndev    false                       1259    17734 )   TicketRequestType_TicketRequestTypeId_seq    SEQUENCE     �   CREATE SEQUENCE public."TicketRequestType_TicketRequestTypeId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public."TicketRequestType_TicketRequestTypeId_seq";
       public          spacedesigndev    false    279            �           0    0 )   TicketRequestType_TicketRequestTypeId_seq    SEQUENCE OWNED BY     }   ALTER SEQUENCE public."TicketRequestType_TicketRequestTypeId_seq" OWNED BY public."TicketRequestType"."TicketRequestTypeId";
          public          spacedesigndev    false    280                       1259    17735    TicketStatus    TABLE     �   CREATE TABLE public."TicketStatus" (
    "TicketStatusId" bigint NOT NULL,
    "TicketStatusName" character varying NOT NULL
);
 "   DROP TABLE public."TicketStatus";
       public         heap    spacedesigndev    false                       1259    17740    TicketStatus_TicketStatusId_seq    SEQUENCE     �   CREATE SEQUENCE public."TicketStatus_TicketStatusId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."TicketStatus_TicketStatusId_seq";
       public          spacedesigndev    false    281            �           0    0    TicketStatus_TicketStatusId_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."TicketStatus_TicketStatusId_seq" OWNED BY public."TicketStatus"."TicketStatusId";
          public          spacedesigndev    false    282            �           2604    20303    Company CompanyId    DEFAULT     |   ALTER TABLE ONLY public."Company" ALTER COLUMN "CompanyId" SET DEFAULT nextval('public."Company_CompanyId_seq"'::regclass);
 D   ALTER TABLE public."Company" ALTER COLUMN "CompanyId" DROP DEFAULT;
       public          spacedesigndev    false    222    221            �           2604    20304    Contact IdContact    DEFAULT     |   ALTER TABLE ONLY public."Contact" ALTER COLUMN "IdContact" SET DEFAULT nextval('public."Contact_IdContact_seq"'::regclass);
 D   ALTER TABLE public."Contact" ALTER COLUMN "IdContact" DROP DEFAULT;
       public          spacedesigndev    false    228    223            �           2604    20305    ContactBudgetRange IdBudget    DEFAULT     �   ALTER TABLE ONLY public."ContactBudgetRange" ALTER COLUMN "IdBudget" SET DEFAULT nextval('public."ContactBudgetRange_IdBudget_seq"'::regclass);
 N   ALTER TABLE public."ContactBudgetRange" ALTER COLUMN "IdBudget" DROP DEFAULT;
       public          spacedesigndev    false    225    224            �           2604    20306    ContactObject IdObject    DEFAULT     �   ALTER TABLE ONLY public."ContactObject" ALTER COLUMN "IdObject" SET DEFAULT nextval('public."ContactObject_IdObject_seq"'::regclass);
 I   ALTER TABLE public."ContactObject" ALTER COLUMN "IdObject" DROP DEFAULT;
       public          spacedesigndev    false    227    226            �           2604    20307    Conversation ConversationId    DEFAULT     �   ALTER TABLE ONLY public."Conversation" ALTER COLUMN "ConversationId" SET DEFAULT nextval('public."Conversation_ConversationId_seq"'::regclass);
 N   ALTER TABLE public."Conversation" ALTER COLUMN "ConversationId" DROP DEFAULT;
       public          spacedesigndev    false    230    229            �           2604    20308    Customer CustomerId    DEFAULT     �   ALTER TABLE ONLY public."Customer" ALTER COLUMN "CustomerId" SET DEFAULT nextval('public."Customer_CustomerId_seq"'::regclass);
 F   ALTER TABLE public."Customer" ALTER COLUMN "CustomerId" DROP DEFAULT;
       public          spacedesigndev    false    233    231            �           2604    20309    Group PermissionGroupId    DEFAULT     �   ALTER TABLE ONLY public."Group" ALTER COLUMN "PermissionGroupId" SET DEFAULT nextval('public."Group_PermissionGroupId_seq"'::regclass);
 J   ALTER TABLE public."Group" ALTER COLUMN "PermissionGroupId" DROP DEFAULT;
       public          spacedesigndev    false    235    234            �           2604    20310    Message MessageId    DEFAULT     |   ALTER TABLE ONLY public."Message" ALTER COLUMN "MessageId" SET DEFAULT nextval('public."Message_MessageId_seq"'::regclass);
 D   ALTER TABLE public."Message" ALTER COLUMN "MessageId" DROP DEFAULT;
       public          spacedesigndev    false    237    236                       2604    20311    Notification NotificationId    DEFAULT     �   ALTER TABLE ONLY public."Notification" ALTER COLUMN "NotificationId" SET DEFAULT nextval('public."Notification_NotificationId_seq"'::regclass);
 N   ALTER TABLE public."Notification" ALTER COLUMN "NotificationId" DROP DEFAULT;
       public          spacedesigndev    false    241    238            �           2604    20312    Permission PermissionId    DEFAULT     �   ALTER TABLE ONLY public."Permission" ALTER COLUMN "PermissionId" SET DEFAULT nextval('public."Permission_PermissionId_seq"'::regclass);
 J   ALTER TABLE public."Permission" ALTER COLUMN "PermissionId" DROP DEFAULT;
       public          spacedesigndev    false    217    215                       2604    20313    Project ProjectId    DEFAULT     |   ALTER TABLE ONLY public."Project" ALTER COLUMN "ProjectId" SET DEFAULT nextval('public."Project_ProjectId_seq"'::regclass);
 D   ALTER TABLE public."Project" ALTER COLUMN "ProjectId" DROP DEFAULT;
       public          spacedesigndev    false    272    242                       2604    20314    ProjectBanner ProjectBannerId    DEFAULT     �   ALTER TABLE ONLY public."ProjectBanner" ALTER COLUMN "ProjectBannerId" SET DEFAULT nextval('public."ProjectBanner_ProjectBannerId_seq"'::regclass);
 P   ALTER TABLE public."ProjectBanner" ALTER COLUMN "ProjectBannerId" DROP DEFAULT;
       public          spacedesigndev    false    244    243                       2604    20315    ProjectFiles ProjectFileId    DEFAULT     �   ALTER TABLE ONLY public."ProjectFiles" ALTER COLUMN "ProjectFileId" SET DEFAULT nextval('public."ProjectFiles_ProjectFileId_seq"'::regclass);
 M   ALTER TABLE public."ProjectFiles" ALTER COLUMN "ProjectFileId" DROP DEFAULT;
       public          spacedesigndev    false    246    245            
           2604    20316    ProjectFolder FolderId    DEFAULT     �   ALTER TABLE ONLY public."ProjectFolder" ALTER COLUMN "FolderId" SET DEFAULT nextval('public."ProjectFolder_FolderId_seq"'::regclass);
 I   ALTER TABLE public."ProjectFolder" ALTER COLUMN "FolderId" DROP DEFAULT;
       public          spacedesigndev    false    248    247                       2604    20317    ProjectLink ProjectLinkId    DEFAULT     �   ALTER TABLE ONLY public."ProjectLink" ALTER COLUMN "ProjectLinkId" SET DEFAULT nextval('public."ProjectLink_ProjectLinkId_seq"'::regclass);
 L   ALTER TABLE public."ProjectLink" ALTER COLUMN "ProjectLinkId" DROP DEFAULT;
       public          spacedesigndev    false    252    249                       2604    20318 !   ProjectLinkType ProjectLinkTypeId    DEFAULT     �   ALTER TABLE ONLY public."ProjectLinkType" ALTER COLUMN "ProjectLinkTypeId" SET DEFAULT nextval('public."ProjectLinkType_ProjectLinkTypeId_seq"'::regclass);
 T   ALTER TABLE public."ProjectLinkType" ALTER COLUMN "ProjectLinkTypeId" DROP DEFAULT;
       public          spacedesigndev    false    251    250                       2604    20319    ProjectTask ProjectTaskId    DEFAULT     �   ALTER TABLE ONLY public."ProjectTask" ALTER COLUMN "ProjectTaskId" SET DEFAULT nextval('public."ProjectTask_ProjectTaskId_seq"'::regclass);
 L   ALTER TABLE public."ProjectTask" ALTER COLUMN "ProjectTaskId" DROP DEFAULT;
       public          spacedesigndev    false    267    253                       2604    20320    ProjectTaskCheckbox CheckboxId    DEFAULT     �   ALTER TABLE ONLY public."ProjectTaskCheckbox" ALTER COLUMN "CheckboxId" SET DEFAULT nextval('public."ProjectTaskCheckbox_CheckboxId_seq"'::regclass);
 Q   ALTER TABLE public."ProjectTaskCheckbox" ALTER COLUMN "CheckboxId" DROP DEFAULT;
       public          spacedesigndev    false    255    254                       2604    20321     ProjectTaskChecklist ChecklistId    DEFAULT     �   ALTER TABLE ONLY public."ProjectTaskChecklist" ALTER COLUMN "ChecklistId" SET DEFAULT nextval('public."ProjectTaskChecklist_ChecklistId_seq"'::regclass);
 S   ALTER TABLE public."ProjectTaskChecklist" ALTER COLUMN "ChecklistId" DROP DEFAULT;
       public          spacedesigndev    false    257    256                       2604    20322 '   ProjectTaskComment ProjectTaskCommentId    DEFAULT     �   ALTER TABLE ONLY public."ProjectTaskComment" ALTER COLUMN "ProjectTaskCommentId" SET DEFAULT nextval('public."ProjectTaskComment_ProjectTaskCommentIId_seq"'::regclass);
 Z   ALTER TABLE public."ProjectTaskComment" ALTER COLUMN "ProjectTaskCommentId" DROP DEFAULT;
       public          spacedesigndev    false    259    258                       2604    20323    ProjectTaskFiles TaskFileId    DEFAULT     �   ALTER TABLE ONLY public."ProjectTaskFiles" ALTER COLUMN "TaskFileId" SET DEFAULT nextval('public."ProjectTaskFiles_TaskFileId_seq"'::regclass);
 N   ALTER TABLE public."ProjectTaskFiles" ALTER COLUMN "TaskFileId" DROP DEFAULT;
       public          spacedesigndev    false    261    260                       2604    20324 %   ProjectTaskStatus ProjectTaskStatusId    DEFAULT     �   ALTER TABLE ONLY public."ProjectTaskStatus" ALTER COLUMN "ProjectTaskStatusId" SET DEFAULT nextval('public."ProjectTaskStatus_ProjectTaskStatusId_seq"'::regclass);
 X   ALTER TABLE public."ProjectTaskStatus" ALTER COLUMN "ProjectTaskStatusId" DROP DEFAULT;
       public          spacedesigndev    false    263    262                       2604    20325    ProjectTaskTag ProjectTaskTagId    DEFAULT     �   ALTER TABLE ONLY public."ProjectTaskTag" ALTER COLUMN "ProjectTaskTagId" SET DEFAULT nextval('public."ProjectTaskTag_ProjectTaskTagId_seq"'::regclass);
 R   ALTER TABLE public."ProjectTaskTag" ALTER COLUMN "ProjectTaskTagId" DROP DEFAULT;
       public          spacedesigndev    false    265    264                       2604    20326    ProjectTicket ProjectTicketId    DEFAULT     �   ALTER TABLE ONLY public."ProjectTicket" ALTER COLUMN "ProjectTicketId" SET DEFAULT nextval('public."ProjectTicket_ProjectTicketId_seq"'::regclass);
 P   ALTER TABLE public."ProjectTicket" ALTER COLUMN "ProjectTicketId" DROP DEFAULT;
       public          spacedesigndev    false    271    270            �           2604    20327    Role RoleId    DEFAULT     p   ALTER TABLE ONLY public."Role" ALTER COLUMN "RoleId" SET DEFAULT nextval('public."Role_RoleId_seq"'::regclass);
 >   ALTER TABLE public."Role" ALTER COLUMN "RoleId" DROP DEFAULT;
       public          spacedesigndev    false    220    218                       2604    20328    Staffer StafferId    DEFAULT     |   ALTER TABLE ONLY public."Staffer" ALTER COLUMN "StafferId" SET DEFAULT nextval('public."Staffer_StafferId_seq"'::regclass);
 D   ALTER TABLE public."Staffer" ALTER COLUMN "StafferId" DROP DEFAULT;
       public          spacedesigndev    false    276    274                       2604    20329    Status StatusId    DEFAULT     x   ALTER TABLE ONLY public."Status" ALTER COLUMN "StatusId" SET DEFAULT nextval('public."Status_StatusId_seq"'::regclass);
 B   ALTER TABLE public."Status" ALTER COLUMN "StatusId" DROP DEFAULT;
       public          spacedesigndev    false    278    277                       2604    20330 %   TicketRequestType TicketRequestTypeId    DEFAULT     �   ALTER TABLE ONLY public."TicketRequestType" ALTER COLUMN "TicketRequestTypeId" SET DEFAULT nextval('public."TicketRequestType_TicketRequestTypeId_seq"'::regclass);
 X   ALTER TABLE public."TicketRequestType" ALTER COLUMN "TicketRequestTypeId" DROP DEFAULT;
       public          spacedesigndev    false    280    279                        2604    20331    TicketStatus TicketStatusId    DEFAULT     �   ALTER TABLE ONLY public."TicketStatus" ALTER COLUMN "TicketStatusId" SET DEFAULT nextval('public."TicketStatus_TicketStatusId_seq"'::regclass);
 N   ALTER TABLE public."TicketStatus" ALTER COLUMN "TicketStatusId" DROP DEFAULT;
       public          spacedesigndev    false    282    281            !          0    17555    Company 
   TABLE DATA           �   COPY public."Company" ("CompanyId", "CompanyName", "CompanyAddress", "CompanyEmail", "CompanyPhone", "CompanyImageUrl") FROM stdin;
    public          spacedesigndev    false    221   �q      #          0    17559    Contact 
   TABLE DATA           �   COPY public."Contact" ("IdContact", "FirstName", "LastName", "Email", "Company", "IdBudget", "IdObject", "Message", "CreatedAt") FROM stdin;
    public          spacedesigndev    false    223   qr      $          0    17565    ContactBudgetRange 
   TABLE DATA           C   COPY public."ContactBudgetRange" ("IdBudget", "Range") FROM stdin;
    public          spacedesigndev    false    224   �r      &          0    17569    ContactObject 
   TABLE DATA           =   COPY public."ContactObject" ("IdObject", "Name") FROM stdin;
    public          spacedesigndev    false    226   �r      )          0    17574    Conversation 
   TABLE DATA           c   COPY public."Conversation" ("ConversationId", "Staffer1Id", "Staffer2Id", "ProjectId") FROM stdin;
    public          spacedesigndev    false    229   Ns      +          0    17578    Customer 
   TABLE DATA           �   COPY public."Customer" ("CustomerId", "CustomerName", "CustomerSurname", "CustomerEmail", "CustomerPhone", "CustomerPassword", "CustomerImageUrl") FROM stdin;
    public          spacedesigndev    false    231   �s      ,          0    17583    CustomerCompany 
   TABLE DATA           F   COPY public."CustomerCompany" ("CustomerId", "CompanyId") FROM stdin;
    public          spacedesigndev    false    232   't      .          0    17587    Group 
   TABLE DATA           C   COPY public."Group" ("PermissionGroupId", "GroupName") FROM stdin;
    public          spacedesigndev    false    234   Ht      0          0    17591    Message 
   TABLE DATA           s   COPY public."Message" ("MessageId", "StafferSenderId", "ConversationId", "Date", "Text", "IsCustomer") FROM stdin;
    public          spacedesigndev    false    236   �t      2          0    17598    Notification 
   TABLE DATA           m   COPY public."Notification" ("NotificationId", "NotificationMessage", "NotificationCreationDate") FROM stdin;
    public          spacedesigndev    false    238   �v      3          0    17604    NotificationExtraData 
   TABLE DATA           W   COPY public."NotificationExtraData" ("NotificationId", "UserId", "IsRead") FROM stdin;
    public          spacedesigndev    false    239   j|      4          0    17607    NotificationInfo 
   TABLE DATA           ~   COPY public."NotificationInfo" ("NotificationId", "ProjectId", "StafferId", "CustomerId", "NotificationTypeName") FROM stdin;
    public          spacedesigndev    false    240   �|                0    16462 
   Permission 
   TABLE DATA           u   COPY public."Permission" ("PermissionId", "PermissionName", "PermissionDescription", "PermissionAction") FROM stdin;
    public          spacedesigndev    false    215   �}                0    16467    PermissionGroup 
   TABLE DATA           P   COPY public."PermissionGroup" ("PermissionId", "PermissionGroupId") FROM stdin;
    public          spacedesigndev    false    216   %�      6          0    17613    Project 
   TABLE DATA           �   COPY public."Project" ("ProjectId", "ProjectName", "ProjectDescription", "ProjectCreationDate", "ProjectEndDate", "ProjectManagerId", "ProjectBannerId", "CompanyId", "StatusId", "UniqueCode") FROM stdin;
    public          spacedesigndev    false    242   ��      7          0    17621    ProjectBanner 
   TABLE DATA           Q   COPY public."ProjectBanner" ("ProjectBannerId", "ProjectBannerPath") FROM stdin;
    public          spacedesigndev    false    243   �      9          0    17625    ProjectFiles 
   TABLE DATA           j   COPY public."ProjectFiles" ("ProjectFileId", "FileName", "FilePath", "ForClient", "FolderId") FROM stdin;
    public          spacedesigndev    false    245   ��      ;          0    17632    ProjectFolder 
   TABLE DATA           �   COPY public."ProjectFolder" ("FolderId", "FolderName", "ProjectId", "CustomerVisible", "TeamVisible", "UpFolderId") FROM stdin;
    public          spacedesigndev    false    247   ��      =          0    17638    ProjectLink 
   TABLE DATA           �   COPY public."ProjectLink" ("ProjectLinkId", "ProjectId", "ProjectLinkTitle", "ProjectLinkUrl", "ProjectLinkTypeId") FROM stdin;
    public          spacedesigndev    false    249   �      >          0    17643    ProjectLinkType 
   TABLE DATA           o   COPY public."ProjectLinkType" ("ProjectLinkTypeId", "ProjectLinkTypeName", "ProjectLinkTypeImage") FROM stdin;
    public          spacedesigndev    false    250   ��      A          0    17650    ProjectTask 
   TABLE DATA           �   COPY public."ProjectTask" ("ProjectTaskId", "ProjectTaskName", "ProjectTaskDescription", "ProjectTaskExpiration", "ProjectTaskStatusId", "ProjectId", "ProjectTaskCreation", "IsArchived") FROM stdin;
    public          spacedesigndev    false    253   -�      B          0    17657    ProjectTaskCheckbox 
   TABLE DATA           b   COPY public."ProjectTaskCheckbox" ("CheckboxId", "ChecklistId", "IsSelected", "Text") FROM stdin;
    public          spacedesigndev    false    254   2�      D          0    17664    ProjectTaskChecklist 
   TABLE DATA           X   COPY public."ProjectTaskChecklist" ("ChecklistId", "Text", "ProjectTaskId") FROM stdin;
    public          spacedesigndev    false    256   W�      F          0    17670    ProjectTaskComment 
   TABLE DATA           {   COPY public."ProjectTaskComment" ("ProjectTaskId", "StafferId", "Text", "CommentDate", "ProjectTaskCommentId") FROM stdin;
    public          spacedesigndev    false    258   ��      H          0    17677    ProjectTaskFiles 
   TABLE DATA           \   COPY public."ProjectTaskFiles" ("TaskFileId", "FileName", "FilePath", "TaskId") FROM stdin;
    public          spacedesigndev    false    260   �      J          0    17683    ProjectTaskStatus 
   TABLE DATA           ]   COPY public."ProjectTaskStatus" ("ProjectTaskStatusId", "ProjectTaskStatusName") FROM stdin;
    public          spacedesigndev    false    262   -�      L          0    17687    ProjectTaskTag 
   TABLE DATA           T   COPY public."ProjectTaskTag" ("ProjectTaskTagId", "ProjectTaskTagName") FROM stdin;
    public          spacedesigndev    false    264   z�      N          0    17691    ProjectTaskTeam 
   TABLE DATA           I   COPY public."ProjectTaskTeam" ("ProjectTaskId", "StafferId") FROM stdin;
    public          spacedesigndev    false    266   դ      P          0    17695    ProjectTasksTags 
   TABLE DATA           Q   COPY public."ProjectTasksTags" ("ProjectTaskId", "ProjectTaskTagId") FROM stdin;
    public          spacedesigndev    false    268   d�      Q          0    17698    ProjectTeam 
   TABLE DATA           A   COPY public."ProjectTeam" ("ProjectId", "StafferId") FROM stdin;
    public          spacedesigndev    false    269   �      R          0    17701    ProjectTicket 
   TABLE DATA           �   COPY public."ProjectTicket" ("ProjectTicketId", "ProjectTicketTitle", "ProjectTicketDescription", "TicketStatusId", "ProjectTicketCreationDate", "ProjectTicketCompletedDate", "ProjectId", "CustomerId", "TicketRequestTypeId") FROM stdin;
    public          spacedesigndev    false    270   2�      U          0    17710    ReadContact 
   TABLE DATA           �   COPY public."ReadContact" ("IdContact", "FirstName", "LastName", "Email", "Company", "IdBudget", "IdObject", "Message", "CreatedAt") FROM stdin;
    public          spacedesigndev    false    273   O�                0    16573    Role 
   TABLE DATA           Y   COPY public."Role" ("RoleId", "RoleName", "RoleDescription", "RolePriority") FROM stdin;
    public          spacedesigndev    false    218   l�                0    16578    RolePermission 
   TABLE DATA           D   COPY public."RolePermission" ("RoleId", "PermissionId") FROM stdin;
    public          spacedesigndev    false    219   �      V          0    17715    Staffer 
   TABLE DATA           �   COPY public."Staffer" ("StafferId", "StafferName", "StafferSurname", "StafferEmail", "StafferPhone", "StafferPassword", "StafferImageUrl", "RecoveryCode", "CreationTime") FROM stdin;
    public          spacedesigndev    false    274   A�      W          0    17721    StafferRole 
   TABLE DATA           >   COPY public."StafferRole" ("StafferId", "RoleId") FROM stdin;
    public          spacedesigndev    false    275   ?�      Y          0    17725    Status 
   TABLE DATA           K   COPY public."Status" ("StatusId", "StatusName", "StatusColor") FROM stdin;
    public          spacedesigndev    false    277   o�      [          0    17729    TicketRequestType 
   TABLE DATA           Y   COPY public."TicketRequestType" ("TicketRequestTypeId", "TicketRequestName") FROM stdin;
    public          spacedesigndev    false    279   Ū      ]          0    17735    TicketStatus 
   TABLE DATA           N   COPY public."TicketStatus" ("TicketStatusId", "TicketStatusName") FROM stdin;
    public          spacedesigndev    false    281   ��      �           0    0    Company_CompanyId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Company_CompanyId_seq"', 3, true);
          public          spacedesigndev    false    222            �           0    0    ContactBudgetRange_IdBudget_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."ContactBudgetRange_IdBudget_seq"', 5, true);
          public          spacedesigndev    false    225            �           0    0    ContactObject_IdObject_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."ContactObject_IdObject_seq"', 6, true);
          public          spacedesigndev    false    227            �           0    0    Contact_IdContact_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Contact_IdContact_seq"', 1, false);
          public          spacedesigndev    false    228            �           0    0    Conversation_ConversationId_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Conversation_ConversationId_seq"', 25, true);
          public          spacedesigndev    false    230            �           0    0    Customer_CustomerId_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Customer_CustomerId_seq"', 1, true);
          public          spacedesigndev    false    233            �           0    0    Group_PermissionGroupId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Group_PermissionGroupId_seq"', 9, true);
          public          spacedesigndev    false    235            �           0    0    Message_MessageId_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Message_MessageId_seq"', 63, true);
          public          spacedesigndev    false    237            �           0    0    Notification_NotificationId_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Notification_NotificationId_seq"', 69, true);
          public          spacedesigndev    false    241            �           0    0    Permission_PermissionId_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Permission_PermissionId_seq"', 40, true);
          public          spacedesigndev    false    217            �           0    0 !   ProjectBanner_ProjectBannerId_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."ProjectBanner_ProjectBannerId_seq"', 9, true);
          public          spacedesigndev    false    244            �           0    0    ProjectFiles_ProjectFileId_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."ProjectFiles_ProjectFileId_seq"', 232, true);
          public          spacedesigndev    false    246            �           0    0    ProjectFolder_FolderId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."ProjectFolder_FolderId_seq"', 10, true);
          public          spacedesigndev    false    248            �           0    0 %   ProjectLinkType_ProjectLinkTypeId_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."ProjectLinkType_ProjectLinkTypeId_seq"', 7, true);
          public          spacedesigndev    false    251            �           0    0    ProjectLink_ProjectLinkId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."ProjectLink_ProjectLinkId_seq"', 5, true);
          public          spacedesigndev    false    252            �           0    0 "   ProjectTaskCheckbox_CheckboxId_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."ProjectTaskCheckbox_CheckboxId_seq"', 22, true);
          public          spacedesigndev    false    255            �           0    0 $   ProjectTaskChecklist_ChecklistId_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."ProjectTaskChecklist_ChecklistId_seq"', 9, true);
          public          spacedesigndev    false    257            �           0    0 ,   ProjectTaskComment_ProjectTaskCommentIId_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public."ProjectTaskComment_ProjectTaskCommentIId_seq"', 5, true);
          public          spacedesigndev    false    259            �           0    0    ProjectTaskFiles_TaskFileId_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."ProjectTaskFiles_TaskFileId_seq"', 1, true);
          public          spacedesigndev    false    261            �           0    0 )   ProjectTaskStatus_ProjectTaskStatusId_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public."ProjectTaskStatus_ProjectTaskStatusId_seq"', 4, true);
          public          spacedesigndev    false    263            �           0    0 #   ProjectTaskTag_ProjectTaskTagId_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."ProjectTaskTag_ProjectTaskTagId_seq"', 12, true);
          public          spacedesigndev    false    265            �           0    0    ProjectTask_ProjectTaskId_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."ProjectTask_ProjectTaskId_seq"', 53, true);
          public          spacedesigndev    false    267            �           0    0 !   ProjectTicket_ProjectTicketId_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."ProjectTicket_ProjectTicketId_seq"', 1, false);
          public          spacedesigndev    false    271            �           0    0    Project_ProjectId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Project_ProjectId_seq"', 7, true);
          public          spacedesigndev    false    272            �           0    0    Role_RoleId_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Role_RoleId_seq"', 26, true);
          public          spacedesigndev    false    220            �           0    0    Staffer_StafferId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Staffer_StafferId_seq"', 4, true);
          public          spacedesigndev    false    276            �           0    0    Status_StatusId_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Status_StatusId_seq"', 3, true);
          public          spacedesigndev    false    278            �           0    0 )   TicketRequestType_TicketRequestTypeId_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('public."TicketRequestType_TicketRequestTypeId_seq"', 14, true);
          public          spacedesigndev    false    280            �           0    0    TicketStatus_TicketStatusId_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."TicketStatus_TicketStatusId_seq"', 10, true);
          public          spacedesigndev    false    282            *           2606    17772    Company Company_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("CompanyId");
 B   ALTER TABLE ONLY public."Company" DROP CONSTRAINT "Company_pkey";
       public            spacedesigndev    false    221            :           2606    17774    Message Comunication_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Comunication_pkey" PRIMARY KEY ("MessageId");
 G   ALTER TABLE ONLY public."Message" DROP CONSTRAINT "Comunication_pkey";
       public            spacedesigndev    false    236            .           2606    17776 *   ContactBudgetRange ContactBudgetRange_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."ContactBudgetRange"
    ADD CONSTRAINT "ContactBudgetRange_pkey" PRIMARY KEY ("IdBudget");
 X   ALTER TABLE ONLY public."ContactBudgetRange" DROP CONSTRAINT "ContactBudgetRange_pkey";
       public            spacedesigndev    false    224            0           2606    17778     ContactObject ContactObject_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."ContactObject"
    ADD CONSTRAINT "ContactObject_pkey" PRIMARY KEY ("IdObject");
 N   ALTER TABLE ONLY public."ContactObject" DROP CONSTRAINT "ContactObject_pkey";
       public            spacedesigndev    false    226            ,           2606    17780    Contact Contact_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("IdContact");
 B   ALTER TABLE ONLY public."Contact" DROP CONSTRAINT "Contact_pkey";
       public            spacedesigndev    false    223            2           2606    17782    Conversation Conversation_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY ("ConversationId");
 L   ALTER TABLE ONLY public."Conversation" DROP CONSTRAINT "Conversation_pkey";
       public            spacedesigndev    false    229            6           2606    17784 $   CustomerCompany CustomerCompany_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public."CustomerCompany"
    ADD CONSTRAINT "CustomerCompany_pkey" PRIMARY KEY ("CustomerId", "CompanyId");
 R   ALTER TABLE ONLY public."CustomerCompany" DROP CONSTRAINT "CustomerCompany_pkey";
       public            spacedesigndev    false    232    232            4           2606    17786    Customer Customer_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("CustomerId");
 D   ALTER TABLE ONLY public."Customer" DROP CONSTRAINT "Customer_pkey";
       public            spacedesigndev    false    231            8           2606    17788    Group Group_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("PermissionGroupId");
 >   ALTER TABLE ONLY public."Group" DROP CONSTRAINT "Group_pkey";
       public            spacedesigndev    false    234            <           2606    17790    Notification Notification_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("NotificationId");
 L   ALTER TABLE ONLY public."Notification" DROP CONSTRAINT "Notification_pkey";
       public            spacedesigndev    false    238            $           2606    16658 $   PermissionGroup PermissionGroup_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."PermissionGroup"
    ADD CONSTRAINT "PermissionGroup_pkey" PRIMARY KEY ("PermissionId", "PermissionGroupId");
 R   ALTER TABLE ONLY public."PermissionGroup" DROP CONSTRAINT "PermissionGroup_pkey";
       public            spacedesigndev    false    216    216            "           2606    16660    Permission Permission_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Permission"
    ADD CONSTRAINT "Permission_pkey" PRIMARY KEY ("PermissionId");
 H   ALTER TABLE ONLY public."Permission" DROP CONSTRAINT "Permission_pkey";
       public            spacedesigndev    false    215            @           2606    17792     ProjectBanner ProjectBanner_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."ProjectBanner"
    ADD CONSTRAINT "ProjectBanner_pkey" PRIMARY KEY ("ProjectBannerId");
 N   ALTER TABLE ONLY public."ProjectBanner" DROP CONSTRAINT "ProjectBanner_pkey";
       public            spacedesigndev    false    243            B           2606    17794    ProjectFiles ProjectFiles_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public."ProjectFiles"
    ADD CONSTRAINT "ProjectFiles_pkey" PRIMARY KEY ("ProjectFileId");
 L   ALTER TABLE ONLY public."ProjectFiles" DROP CONSTRAINT "ProjectFiles_pkey";
       public            spacedesigndev    false    245            D           2606    17796     ProjectFolder ProjectFolder_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."ProjectFolder"
    ADD CONSTRAINT "ProjectFolder_pkey" PRIMARY KEY ("FolderId");
 N   ALTER TABLE ONLY public."ProjectFolder" DROP CONSTRAINT "ProjectFolder_pkey";
       public            spacedesigndev    false    247            H           2606    17798 $   ProjectLinkType ProjectLinkType_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public."ProjectLinkType"
    ADD CONSTRAINT "ProjectLinkType_pkey" PRIMARY KEY ("ProjectLinkTypeId");
 R   ALTER TABLE ONLY public."ProjectLinkType" DROP CONSTRAINT "ProjectLinkType_pkey";
       public            spacedesigndev    false    250            F           2606    17800    ProjectLink ProjectLink_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public."ProjectLink"
    ADD CONSTRAINT "ProjectLink_pkey" PRIMARY KEY ("ProjectLinkId");
 J   ALTER TABLE ONLY public."ProjectLink" DROP CONSTRAINT "ProjectLink_pkey";
       public            spacedesigndev    false    249            L           2606    17802 ,   ProjectTaskCheckbox ProjectTaskCheckbox_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public."ProjectTaskCheckbox"
    ADD CONSTRAINT "ProjectTaskCheckbox_pkey" PRIMARY KEY ("CheckboxId");
 Z   ALTER TABLE ONLY public."ProjectTaskCheckbox" DROP CONSTRAINT "ProjectTaskCheckbox_pkey";
       public            spacedesigndev    false    254            N           2606    17804 .   ProjectTaskChecklist ProjectTaskChecklist_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public."ProjectTaskChecklist"
    ADD CONSTRAINT "ProjectTaskChecklist_pkey" PRIMARY KEY ("ChecklistId");
 \   ALTER TABLE ONLY public."ProjectTaskChecklist" DROP CONSTRAINT "ProjectTaskChecklist_pkey";
       public            spacedesigndev    false    256            P           2606    17806 *   ProjectTaskComment ProjectTaskComment_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTaskComment"
    ADD CONSTRAINT "ProjectTaskComment_pkey" PRIMARY KEY ("ProjectTaskCommentId");
 X   ALTER TABLE ONLY public."ProjectTaskComment" DROP CONSTRAINT "ProjectTaskComment_pkey";
       public            spacedesigndev    false    258            R           2606    17808 &   ProjectTaskFiles ProjectTaskFiles_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public."ProjectTaskFiles"
    ADD CONSTRAINT "ProjectTaskFiles_pkey" PRIMARY KEY ("TaskFileId");
 T   ALTER TABLE ONLY public."ProjectTaskFiles" DROP CONSTRAINT "ProjectTaskFiles_pkey";
       public            spacedesigndev    false    260            T           2606    17810 (   ProjectTaskStatus ProjectTaskStatus_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public."ProjectTaskStatus"
    ADD CONSTRAINT "ProjectTaskStatus_pkey" PRIMARY KEY ("ProjectTaskStatusId");
 V   ALTER TABLE ONLY public."ProjectTaskStatus" DROP CONSTRAINT "ProjectTaskStatus_pkey";
       public            spacedesigndev    false    262            V           2606    17812 "   ProjectTaskTag ProjectTaskTag_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."ProjectTaskTag"
    ADD CONSTRAINT "ProjectTaskTag_pkey" PRIMARY KEY ("ProjectTaskTagId");
 P   ALTER TABLE ONLY public."ProjectTaskTag" DROP CONSTRAINT "ProjectTaskTag_pkey";
       public            spacedesigndev    false    264            J           2606    17814    ProjectTask ProjectTask_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public."ProjectTask"
    ADD CONSTRAINT "ProjectTask_pkey" PRIMARY KEY ("ProjectTaskId");
 J   ALTER TABLE ONLY public."ProjectTask" DROP CONSTRAINT "ProjectTask_pkey";
       public            spacedesigndev    false    253            X           2606    17816     ProjectTicket ProjectTicket_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."ProjectTicket"
    ADD CONSTRAINT "ProjectTicket_pkey" PRIMARY KEY ("ProjectTicketId");
 N   ALTER TABLE ONLY public."ProjectTicket" DROP CONSTRAINT "ProjectTicket_pkey";
       public            spacedesigndev    false    270            >           2606    17818    Project Project_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("ProjectId");
 B   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Project_pkey";
       public            spacedesigndev    false    242            (           2606    16690 "   RolePermission RolePermission_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("RoleId", "PermissionId");
 P   ALTER TABLE ONLY public."RolePermission" DROP CONSTRAINT "RolePermission_pkey";
       public            spacedesigndev    false    219    219            &           2606    16692    Role Role_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("RoleId");
 <   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_pkey";
       public            spacedesigndev    false    218            \           2606    17820    StafferRole StafferRole_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."StafferRole"
    ADD CONSTRAINT "StafferRole_pkey" PRIMARY KEY ("StafferId", "RoleId");
 J   ALTER TABLE ONLY public."StafferRole" DROP CONSTRAINT "StafferRole_pkey";
       public            spacedesigndev    false    275    275            Z           2606    17822    Staffer Staffer_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Staffer"
    ADD CONSTRAINT "Staffer_pkey" PRIMARY KEY ("StafferId");
 B   ALTER TABLE ONLY public."Staffer" DROP CONSTRAINT "Staffer_pkey";
       public            spacedesigndev    false    274            ^           2606    17824    Status Status_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Status"
    ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("StatusId");
 @   ALTER TABLE ONLY public."Status" DROP CONSTRAINT "Status_pkey";
       public            spacedesigndev    false    277            `           2606    17826 (   TicketRequestType TicketRequestType_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public."TicketRequestType"
    ADD CONSTRAINT "TicketRequestType_pkey" PRIMARY KEY ("TicketRequestTypeId");
 V   ALTER TABLE ONLY public."TicketRequestType" DROP CONSTRAINT "TicketRequestType_pkey";
       public            spacedesigndev    false    279            b           2606    17828    TicketStatus TicketStatus_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."TicketStatus"
    ADD CONSTRAINT "TicketStatus_pkey" PRIMARY KEY ("TicketStatusId");
 L   ALTER TABLE ONLY public."TicketStatus" DROP CONSTRAINT "TicketStatus_pkey";
       public            spacedesigndev    false    281            g           2606    17829    Contact Contact_IdBudget_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_IdBudget_fkey" FOREIGN KEY ("IdBudget") REFERENCES public."ContactBudgetRange"("IdBudget");
 K   ALTER TABLE ONLY public."Contact" DROP CONSTRAINT "Contact_IdBudget_fkey";
       public          spacedesigndev    false    4142    223    224            h           2606    17834    Contact Contact_IdObject_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_IdObject_fkey" FOREIGN KEY ("IdObject") REFERENCES public."ContactObject"("IdObject");
 K   ALTER TABLE ONLY public."Contact" DROP CONSTRAINT "Contact_IdObject_fkey";
       public          spacedesigndev    false    223    4144    226            i           2606    17839 (   Conversation Conversation_ProjectId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES public."Project"("ProjectId") ON DELETE CASCADE NOT VALID;
 V   ALTER TABLE ONLY public."Conversation" DROP CONSTRAINT "Conversation_ProjectId_fkey";
       public          spacedesigndev    false    242    229    4158            j           2606    17844 )   Conversation Conversation_Staffer1Id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_Staffer1Id_fkey" FOREIGN KEY ("Staffer1Id") REFERENCES public."Staffer"("StafferId") ON DELETE CASCADE NOT VALID;
 W   ALTER TABLE ONLY public."Conversation" DROP CONSTRAINT "Conversation_Staffer1Id_fkey";
       public          spacedesigndev    false    4186    229    274            k           2606    17849 )   Conversation Conversation_Staffer2Id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_Staffer2Id_fkey" FOREIGN KEY ("Staffer2Id") REFERENCES public."Staffer"("StafferId") ON DELETE CASCADE NOT VALID;
 W   ALTER TABLE ONLY public."Conversation" DROP CONSTRAINT "Conversation_Staffer2Id_fkey";
       public          spacedesigndev    false    4186    229    274            l           2606    17854 .   CustomerCompany CustomerCompany_CompanyId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CustomerCompany"
    ADD CONSTRAINT "CustomerCompany_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES public."Company"("CompanyId") ON DELETE CASCADE NOT VALID;
 \   ALTER TABLE ONLY public."CustomerCompany" DROP CONSTRAINT "CustomerCompany_CompanyId_fkey";
       public          spacedesigndev    false    4138    232    221            m           2606    17859 /   CustomerCompany CustomerCompany_CustomerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CustomerCompany"
    ADD CONSTRAINT "CustomerCompany_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES public."Customer"("CustomerId") ON DELETE CASCADE NOT VALID;
 ]   ALTER TABLE ONLY public."CustomerCompany" DROP CONSTRAINT "CustomerCompany_CustomerId_fkey";
       public          spacedesigndev    false    4148    232    231            n           2606    17864 #   Message Message_ConversationId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_ConversationId_fkey" FOREIGN KEY ("ConversationId") REFERENCES public."Conversation"("ConversationId") ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."Message" DROP CONSTRAINT "Message_ConversationId_fkey";
       public          spacedesigndev    false    4146    236    229            o           2606    17869 ?   NotificationExtraData NotificationExtraData_NotificationId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."NotificationExtraData"
    ADD CONSTRAINT "NotificationExtraData_NotificationId_fkey" FOREIGN KEY ("NotificationId") REFERENCES public."Notification"("NotificationId") NOT VALID;
 m   ALTER TABLE ONLY public."NotificationExtraData" DROP CONSTRAINT "NotificationExtraData_NotificationId_fkey";
       public          spacedesigndev    false    4156    239    238            p           2606    17874 7   NotificationExtraData NotificationExtraData_UserId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."NotificationExtraData"
    ADD CONSTRAINT "NotificationExtraData_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Staffer"("StafferId") ON DELETE CASCADE NOT VALID;
 e   ALTER TABLE ONLY public."NotificationExtraData" DROP CONSTRAINT "NotificationExtraData_UserId_fkey";
       public          spacedesigndev    false    4186    239    274            q           2606    17879 1   NotificationInfo NotificationInfo_CustomerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."NotificationInfo"
    ADD CONSTRAINT "NotificationInfo_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES public."Customer"("CustomerId") NOT VALID;
 _   ALTER TABLE ONLY public."NotificationInfo" DROP CONSTRAINT "NotificationInfo_CustomerId_fkey";
       public          spacedesigndev    false    4148    240    231            r           2606    17884 5   NotificationInfo NotificationInfo_NotificationId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."NotificationInfo"
    ADD CONSTRAINT "NotificationInfo_NotificationId_fkey" FOREIGN KEY ("NotificationId") REFERENCES public."Notification"("NotificationId");
 c   ALTER TABLE ONLY public."NotificationInfo" DROP CONSTRAINT "NotificationInfo_NotificationId_fkey";
       public          spacedesigndev    false    4156    240    238            s           2606    21476 0   NotificationInfo NotificationInfo_ProjectId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."NotificationInfo"
    ADD CONSTRAINT "NotificationInfo_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES public."Project"("ProjectId") ON DELETE CASCADE NOT VALID;
 ^   ALTER TABLE ONLY public."NotificationInfo" DROP CONSTRAINT "NotificationInfo_ProjectId_fkey";
       public          spacedesigndev    false    242    4158    240            t           2606    17894 0   NotificationInfo NotificationInfo_StafferId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."NotificationInfo"
    ADD CONSTRAINT "NotificationInfo_StafferId_fkey" FOREIGN KEY ("StafferId") REFERENCES public."Staffer"("StafferId") ON DELETE CASCADE NOT VALID;
 ^   ALTER TABLE ONLY public."NotificationInfo" DROP CONSTRAINT "NotificationInfo_StafferId_fkey";
       public          spacedesigndev    false    274    4186    240            c           2606    17899 6   PermissionGroup PermissionGroup_PermissionGroupId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PermissionGroup"
    ADD CONSTRAINT "PermissionGroup_PermissionGroupId_fkey" FOREIGN KEY ("PermissionGroupId") REFERENCES public."Group"("PermissionGroupId") ON DELETE CASCADE NOT VALID;
 d   ALTER TABLE ONLY public."PermissionGroup" DROP CONSTRAINT "PermissionGroup_PermissionGroupId_fkey";
       public          spacedesigndev    false    216    234    4152            d           2606    16778 1   PermissionGroup PermissionGroup_PermissionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PermissionGroup"
    ADD CONSTRAINT "PermissionGroup_PermissionId_fkey" FOREIGN KEY ("PermissionId") REFERENCES public."Permission"("PermissionId") ON DELETE CASCADE;
 _   ALTER TABLE ONLY public."PermissionGroup" DROP CONSTRAINT "PermissionGroup_PermissionId_fkey";
       public          spacedesigndev    false    216    4130    215            v           2606    17904 '   ProjectFiles ProjectFiles_FolderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectFiles"
    ADD CONSTRAINT "ProjectFiles_FolderId_fkey" FOREIGN KEY ("FolderId") REFERENCES public."ProjectFolder"("FolderId") ON DELETE CASCADE NOT VALID;
 U   ALTER TABLE ONLY public."ProjectFiles" DROP CONSTRAINT "ProjectFiles_FolderId_fkey";
       public          spacedesigndev    false    245    247    4164            w           2606    17909 *   ProjectFolder ProjectFolder_ProjectId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectFolder"
    ADD CONSTRAINT "ProjectFolder_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES public."Project"("ProjectId") ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."ProjectFolder" DROP CONSTRAINT "ProjectFolder_ProjectId_fkey";
       public          spacedesigndev    false    247    242    4158            x           2606    17914 +   ProjectFolder ProjectFolder_UpFolderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectFolder"
    ADD CONSTRAINT "ProjectFolder_UpFolderId_fkey" FOREIGN KEY ("UpFolderId") REFERENCES public."ProjectFolder"("FolderId") ON DELETE CASCADE NOT VALID;
 Y   ALTER TABLE ONLY public."ProjectFolder" DROP CONSTRAINT "ProjectFolder_UpFolderId_fkey";
       public          spacedesigndev    false    247    247    4164            y           2606    17919 &   ProjectLink ProjectLink_ProjectId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectLink"
    ADD CONSTRAINT "ProjectLink_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES public."Project"("ProjectId") ON DELETE CASCADE NOT VALID;
 T   ALTER TABLE ONLY public."ProjectLink" DROP CONSTRAINT "ProjectLink_ProjectId_fkey";
       public          spacedesigndev    false    242    249    4158            z           2606    17924 .   ProjectLink ProjectLink_ProjectLinkTypeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectLink"
    ADD CONSTRAINT "ProjectLink_ProjectLinkTypeId_fkey" FOREIGN KEY ("ProjectLinkTypeId") REFERENCES public."ProjectLinkType"("ProjectLinkTypeId") NOT VALID;
 \   ALTER TABLE ONLY public."ProjectLink" DROP CONSTRAINT "ProjectLink_ProjectLinkTypeId_fkey";
       public          spacedesigndev    false    249    250    4168            }           2606    17929 8   ProjectTaskCheckbox ProjectTaskCheckbox_ChecklistId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTaskCheckbox"
    ADD CONSTRAINT "ProjectTaskCheckbox_ChecklistId_fkey" FOREIGN KEY ("ChecklistId") REFERENCES public."ProjectTaskChecklist"("ChecklistId") ON DELETE CASCADE NOT VALID;
 f   ALTER TABLE ONLY public."ProjectTaskCheckbox" DROP CONSTRAINT "ProjectTaskCheckbox_ChecklistId_fkey";
       public          spacedesigndev    false    254    256    4174            ~           2606    17934 <   ProjectTaskChecklist ProjectTaskChecklist_ProjectTaskId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTaskChecklist"
    ADD CONSTRAINT "ProjectTaskChecklist_ProjectTaskId_fkey" FOREIGN KEY ("ProjectTaskId") REFERENCES public."ProjectTask"("ProjectTaskId") ON DELETE CASCADE NOT VALID;
 j   ALTER TABLE ONLY public."ProjectTaskChecklist" DROP CONSTRAINT "ProjectTaskChecklist_ProjectTaskId_fkey";
       public          spacedesigndev    false    256    253    4170                       2606    17939 8   ProjectTaskComment ProjectTaskComment_ProjectTaskId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTaskComment"
    ADD CONSTRAINT "ProjectTaskComment_ProjectTaskId_fkey" FOREIGN KEY ("ProjectTaskId") REFERENCES public."ProjectTask"("ProjectTaskId") ON DELETE CASCADE NOT VALID;
 f   ALTER TABLE ONLY public."ProjectTaskComment" DROP CONSTRAINT "ProjectTaskComment_ProjectTaskId_fkey";
       public          spacedesigndev    false    4170    253    258            �           2606    17944 4   ProjectTaskComment ProjectTaskComment_StafferId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTaskComment"
    ADD CONSTRAINT "ProjectTaskComment_StafferId_fkey" FOREIGN KEY ("StafferId") REFERENCES public."Staffer"("StafferId") ON DELETE CASCADE NOT VALID;
 b   ALTER TABLE ONLY public."ProjectTaskComment" DROP CONSTRAINT "ProjectTaskComment_StafferId_fkey";
       public          spacedesigndev    false    4186    258    274            �           2606    17949 -   ProjectTaskFiles ProjectTaskFiles_TaskId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTaskFiles"
    ADD CONSTRAINT "ProjectTaskFiles_TaskId_fkey" FOREIGN KEY ("TaskId") REFERENCES public."ProjectTask"("ProjectTaskId") ON DELETE CASCADE;
 [   ALTER TABLE ONLY public."ProjectTaskFiles" DROP CONSTRAINT "ProjectTaskFiles_TaskId_fkey";
       public          spacedesigndev    false    253    4170    260            �           2606    17954 2   ProjectTaskTeam ProjectTaskTeam_ProjectTaskId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTaskTeam"
    ADD CONSTRAINT "ProjectTaskTeam_ProjectTaskId_fkey" FOREIGN KEY ("ProjectTaskId") REFERENCES public."ProjectTask"("ProjectTaskId") ON DELETE CASCADE;
 `   ALTER TABLE ONLY public."ProjectTaskTeam" DROP CONSTRAINT "ProjectTaskTeam_ProjectTaskId_fkey";
       public          spacedesigndev    false    266    253    4170            �           2606    17959 .   ProjectTaskTeam ProjectTaskTeam_StafferId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTaskTeam"
    ADD CONSTRAINT "ProjectTaskTeam_StafferId_fkey" FOREIGN KEY ("StafferId") REFERENCES public."Staffer"("StafferId") ON DELETE CASCADE NOT VALID;
 \   ALTER TABLE ONLY public."ProjectTaskTeam" DROP CONSTRAINT "ProjectTaskTeam_StafferId_fkey";
       public          spacedesigndev    false    266    274    4186            {           2606    17964 &   ProjectTask ProjectTask_ProjectId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTask"
    ADD CONSTRAINT "ProjectTask_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES public."Project"("ProjectId") ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."ProjectTask" DROP CONSTRAINT "ProjectTask_ProjectId_fkey";
       public          spacedesigndev    false    4158    253    242            |           2606    17969 0   ProjectTask ProjectTask_ProjectTaskStatusId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTask"
    ADD CONSTRAINT "ProjectTask_ProjectTaskStatusId_fkey" FOREIGN KEY ("ProjectTaskStatusId") REFERENCES public."ProjectTaskStatus"("ProjectTaskStatusId");
 ^   ALTER TABLE ONLY public."ProjectTask" DROP CONSTRAINT "ProjectTask_ProjectTaskStatusId_fkey";
       public          spacedesigndev    false    4180    253    262            �           2606    17974 4   ProjectTasksTags ProjectTasksTags_ProjectTaskId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTasksTags"
    ADD CONSTRAINT "ProjectTasksTags_ProjectTaskId_fkey" FOREIGN KEY ("ProjectTaskId") REFERENCES public."ProjectTask"("ProjectTaskId") ON DELETE CASCADE;
 b   ALTER TABLE ONLY public."ProjectTasksTags" DROP CONSTRAINT "ProjectTasksTags_ProjectTaskId_fkey";
       public          spacedesigndev    false    4170    268    253            �           2606    17979 7   ProjectTasksTags ProjectTasksTags_ProjectTaskTagId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTasksTags"
    ADD CONSTRAINT "ProjectTasksTags_ProjectTaskTagId_fkey" FOREIGN KEY ("ProjectTaskTagId") REFERENCES public."ProjectTaskTag"("ProjectTaskTagId");
 e   ALTER TABLE ONLY public."ProjectTasksTags" DROP CONSTRAINT "ProjectTasksTags_ProjectTaskTagId_fkey";
       public          spacedesigndev    false    268    4182    264            �           2606    17984 &   ProjectTeam ProjectTeam_ProjectId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTeam"
    ADD CONSTRAINT "ProjectTeam_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES public."Project"("ProjectId") ON DELETE CASCADE NOT VALID;
 T   ALTER TABLE ONLY public."ProjectTeam" DROP CONSTRAINT "ProjectTeam_ProjectId_fkey";
       public          spacedesigndev    false    269    4158    242            �           2606    17989 &   ProjectTeam ProjectTeam_StafferId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTeam"
    ADD CONSTRAINT "ProjectTeam_StafferId_fkey" FOREIGN KEY ("StafferId") REFERENCES public."Staffer"("StafferId") ON DELETE CASCADE NOT VALID;
 T   ALTER TABLE ONLY public."ProjectTeam" DROP CONSTRAINT "ProjectTeam_StafferId_fkey";
       public          spacedesigndev    false    269    4186    274            �           2606    17994 *   ProjectTicket ProjectTicket_ProjectId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTicket"
    ADD CONSTRAINT "ProjectTicket_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES public."Project"("ProjectId") ON DELETE CASCADE NOT VALID;
 X   ALTER TABLE ONLY public."ProjectTicket" DROP CONSTRAINT "ProjectTicket_ProjectId_fkey";
       public          spacedesigndev    false    270    242    4158            �           2606    17999 4   ProjectTicket ProjectTicket_TicketRequestTypeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProjectTicket"
    ADD CONSTRAINT "ProjectTicket_TicketRequestTypeId_fkey" FOREIGN KEY ("TicketRequestTypeId") REFERENCES public."TicketRequestType"("TicketRequestTypeId") NOT VALID;
 b   ALTER TABLE ONLY public."ProjectTicket" DROP CONSTRAINT "ProjectTicket_TicketRequestTypeId_fkey";
       public          spacedesigndev    false    270    279    4192            u           2606    18004 %   Project Project_ProjectManagerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_ProjectManagerId_fkey" FOREIGN KEY ("ProjectManagerId") REFERENCES public."Staffer"("StafferId") ON DELETE SET NULL NOT VALID;
 S   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Project_ProjectManagerId_fkey";
       public          spacedesigndev    false    4186    274    242            e           2606    16888 /   RolePermission RolePermission_PermissionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_PermissionId_fkey" FOREIGN KEY ("PermissionId") REFERENCES public."Permission"("PermissionId") ON DELETE CASCADE NOT VALID;
 ]   ALTER TABLE ONLY public."RolePermission" DROP CONSTRAINT "RolePermission_PermissionId_fkey";
       public          spacedesigndev    false    4130    215    219            f           2606    16893 )   RolePermission RolePermission_RoleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES public."Role"("RoleId") ON DELETE CASCADE;
 W   ALTER TABLE ONLY public."RolePermission" DROP CONSTRAINT "RolePermission_RoleId_fkey";
       public          spacedesigndev    false    4134    219    218            �           2606    18009 #   StafferRole StafferRole_RoleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."StafferRole"
    ADD CONSTRAINT "StafferRole_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES public."Role"("RoleId") ON DELETE CASCADE NOT VALID;
 Q   ALTER TABLE ONLY public."StafferRole" DROP CONSTRAINT "StafferRole_RoleId_fkey";
       public          spacedesigndev    false    4134    275    218            �           2606    18014 &   StafferRole StafferRole_StafferId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."StafferRole"
    ADD CONSTRAINT "StafferRole_StafferId_fkey" FOREIGN KEY ("StafferId") REFERENCES public."Staffer"("StafferId") ON DELETE CASCADE NOT VALID;
 T   ALTER TABLE ONLY public."StafferRole" DROP CONSTRAINT "StafferRole_StafferId_fkey";
       public          spacedesigndev    false    274    4186    275            !   �   x�5�1�0����+nT��T��"(j@q��\��_o�8}��>6{�\���K"�L�L]yDl�^��7�.���ӜڣZ��%{\�Tav�^�d�xp���ũL3C�\�8���Ϻ��v<B�VJ} ��/'      #      x������ � �      $   E   x�3�|Դ�@AWH��pqQC��1'�7���p��qc��)'������SR������  N!�      &   [   x��=
�0�9�)z��]����K

�)5"����Ӧ�y����GSwJ�H^o���;�>�9������]CL���q��`�5YU\��X-      )   D   x�-��	 1�o3�A�R�D'��s\j!�ig�#��� ��� N)KKM�]K�|]��������      +   u   x�3�I-.��I9�I�E%�%鹉�9z����Ɩ��F&�*FI*�*�I�����FF�)A��z�&�y���^~�i��FN�f�A�FfE�U�!�����1~\1z\\\ ��"p      ,      x�3�4����� ]      .   �   x�M�=
�@��z�{�-��6��2��]�-r��ŌXl�y`�o���a�<�d�Mh�9OL�p��N�]�A�j�|���7�+���&qH<��cu���GFM_�2�N�=�$f�s���uED_w�=�      0   �  x�m�I��@��ί�;J��^/H !ܸrq�'ca�(H��S�3�u"�����^K�]�Hֈk���Ԑ<J9~ �>���=�{DC�9��НrQ9~�h�b�=�D���%����C�D�Ƒ5�t!�T�=J$n��eH��(���KAB��t�G�+���m}���<5�ہk(>��\L���wO�ID��{��X�0��ӟ�w�ۘ��U.vPj�J���͖V9vrGbl�ڲH&�;`���+�y�9J�gR��Eۘ �C��H��.F�T(��r�USfn�Q�\�J��Ȕ!]G2�Ja��p�9q������7���"�n�xbv����1꟭�������?S��ASj�i�X�gz���8λit���m�����~�{�ʹX�hI#�)NC�ME$��_�éw�~ןN���V��!Zk�7�!����4�
�=*=	d��h��:�^��vTk��Cy��G����W��\���      2   �  x��Y�o�D?���9¡(�c�9�������MM�6�K>*mO����.�QEkǫ].@�t!����;�0d�3��V[!=E��o~�ޛ7_*��{#wۅ]���w�o������j��Q/�Ӂ[}�m�.�jZ}MU����U7ի�֫��M��`���zu�&��g���g��d>�@�yց?kk5UQ�gF-VeU�M���P��8�G���-5EmV���j��v��]�޴0�Tе:6��@�y�Ak�HU���2��t7��3���FVHh��\�w�V�:l�&���U뼪IG�����l�V�n	^i�A�麮G&��u�aw:��e=���۳v�b�&����Q-�زb�`�&�GZQ�ejV�e:PuFQ��`ۺR7 F���~��ip�uN��j�@ޮ@OY�C��K���jz��� o�(�w��	��(�ۨ=�|1�A��
3�� o�t~<+҃:��%�5���&!�U�:�A���B,���^'�N�I:'�S
;!�O�P�_����ղ�X�a�.���\�0�)^� J�����(�v�`��@A{��4g��-a�ƄJ���wH
Z�"B�dH���lJL1�+	��y�W�z�$I_���A���I��~(8��<�t��Q�E�ʯ��yC�)V*x�.~��ϛ����s�ǌ��k��__�3F���?��d�������c������	�;�^�b��C�g���ƑDk:��.P�`�׀�I
�	P�[���t*H�2�|jb�E2|����ᢾ��e����j���i��KA'q�ϑ�p�pIU*�V����.	\&D�eK�%f�K��Ku�,�e�������$��تZ�,e2ͬK��T ��#��8f�br~�b�;��E�%U<���=���(Y�,�5�-�(�&ݬ,g�S孲���{g3��M^�
�n�HW��\y/l�E�ʵ�m�'��ʽSL���r����
��K6�7��d�691�.SLU�i.�ݓ��I������zEH���逐���ȋ����,'�Ix-~O�����1A��d����}ф	�U�I2��dᕛ��92��x�2!G
O�@�#�����6�1�����Rz��$xu?/��ը��k�h$��7�F\�	��4m�	W��V� 
�6������
�I����,0�ܔ�VɁ���py�<�J�O�J�}�z�<-��N�gaB���l���ʘ��� w�`T�p1����\L��b��Cn[6d�*x������~]1�]cۦb�`�;��pвC���7�-nu�yc����Sf�[�ȶ����S[���w,ط��Ύ�|��7���-�R��M��{��T�a�5�;�H�P>~KQ�� 0K��      3      x�33�4�,�2�S1z\\\  :      4      x�m�An� E�p�*6�����e��������!�*?)�<}>�� I��m~�?���8Y#*Y*+�y���J/d�?�"[�D�F�����{��~}����~�Y|[iC�cGd@/7�I�<5��gCu�bQ��Аv��|�YXY� Ut(�5:C��*�H:.o1p��\�A�)N��5���i��#YEK�ᬬ�˪9TA�H��������H�"0�:h'���N��8aUn�e�-��Q�h�Wt{�9�t�         t  x��Vˎ�0]'_��lF����,S���A��j�J�$z�<P�̂������1qĴ+"r}N�9���v��m��H�,1I�h�QD��.��� PT�
x%9�P��ct��"ʀ�+F^����u��gN��IL�D4��GEH�J����%^c_��.�,�O�����6�\\�Q����I�٪Ek�v+��|6)%��E��k��B�_�'�	�E9������or���sl��/u��!�$W۪�g���!jx%����ѧ�L֙��V&R�D��:9��ڼ��%}��6�$WG'�3Sd�5t�Ƚ:I������2�y)p�A�9��<�E�?��ć��O"*�_�Iʒ{Ĳ$�o
���(KI��������@R�,��G�n�(��;�Tn��Q�H��|-��K�e'��!��v��cl����Y��q&����YI����/�/b�ɗ�#z�aOj�ʖ�l����Ix��o[�Žn�ΚOj'q�&Զ�Q��!��>��CG�A�a�K�Jc?S���4�|O�*񩪿(�Ů�z{[9s2WfnSb�ڝ
�Gu2��Ӑ*��D/�9F��@�x��#jh/Oʊ*������e�<Q%t5ר[F�رTN}G��1z��y�����<���N�/L����	��!-����hp|��z��z����e嗴`�}ϱ�/������^��Ö�����_C��:!���^ �F���۪(�������-,��w�eŷ�tfX!#��qg_!)�%v ���҃�	����`�lu�s��ک��}�s:7�8�l�]���Z��Dg�R|ƚ��&ܰ(����Z���f�5�I	Wn��I��t�U�K���M��vv���ϑi�ܛs         R   x�͹� ��1?����0
nCiE�/Qb�I�$E�a�_q��Җ���^��0#N���H�9R
��$E�s̍���\      6   y  x�e�=n1�k�)x���4.�"�J�,�h5��v�l�k��]r�$�l	�$ŏ�Q�i�@�ӡ��i[6dw�p_*meaJ(å�Z�aϥ�Z2��L��R�L��Ǚ;=H.z�[�l�v�6}�y9�C�:/ۑM�O� ���#��@��ք��ވp�yE�6w�*Ӷ��)��Q��{�7&|��q$��G���N�9�!`J�B����D%b���T� ��S>:.�;nzg8ZM<"�|�;��3��u�O�}���ش��%-� 4��t�`��E*��j:7h�=״�,�ܖ��ud��M:���;���{�[�������G������_:��c�sg�ȍ�斋71�`�b�t�u�O��      7   k   x�3�(��JM.qJ��K-�/J�KO�+�K�2B�	��,�H�J8�B�MP�#Ssr���2��2�E��`q3T�̼l��9���	T�����%����y`�=... �dO@      9   
  x�}[]o%�}��_�J�D��A�h_��Z�p6wg�����_��ks��rn�2ǔ���C̈́N_��{>���������w��O��NJ���q��"�׸<��D����������{`o��8K��u���#�ӟ�0Fo7�|�9�zef�sp�����/O|8�w�A���2B����@�
9h�ڋ� KF3s��0�.j�m�V�9l�^����&9Lu��k΅S�a�0MaLS�Άt�`�6k���Tk��@�pT~�X]+k�@�=am:l�0�IYM6�{ʚ�c��ژ�D�v	YkΏ����R�8k�����/�Z������$�+���������I2�I�tա�O�s�p�6�F��7齇hN��&cU�[��b4'	�ƃ��>��3��%=��FRP��v�����$`#Y��>B0'	�0����@�b4'	��R���u�!�����ecY�S�9:G8g���(����֝#=g�X�j[��Za��9�sj!��~��;l�H�5]�$fA�e�7�d�\�V���k]=,ҳ��"#��_直u���Ƥ%eH#��+Bw���j�菒�"G��Α�[�!��`���)��Z
�/�k���f�W6���D']������^���iE�Xآ�YN���(`U�B�ZP��YY� 6�(���ݙ5�"+cP���;� �\��YT�����3����ZY�!ڂ��R�w��������.�ɞ��q$��(�հ=�aN�I֣��U�t��$���ĭ���2Uy�6=ےSEC!���M��$���] ���n:I$�do�@�0�%�s�w%��Oӽ ��D�twF �,^�a��9i���+\S���,�<�xT�I�;�Y"9�!o��M��.%�Y�9K@q*ki�� s�hΒ	u-J�:,�^8�,ќ%���ͱ��s��%���w���ir`	;K4g�Dq�pzg��%��Ds�LTgYZ��zcg��,�
Q����$_�Oz��b�����;6:�Zu<�
�ی��m�[���bo�{���9ҽ�Y��:F�SkSRN�7��7����&�mLI+`b�B��� �}o�ӝ���&����`��6��'9�F0�
z1�^�k�SRr��U���;���<\Ն"���1%?��0Ĳ��k�:�"ۨ�"��Trm4��	^���b0��� �k �
��"����3�AC
��S$��@.v����H��T��������|~z�9���;pp08�`��r.��|J-5b�@�o�=��D�!#'="�N��x�{�	،g �&D�O�W��ԉX
�.���'��*���xN�EN	�h_j��ۓ���ݱ�
�X�+w*�6��b}YI]��,O��aRLT\h�[�,kN&�O�D�ZH�vA��
詢c�j�G��MBr���5��&B;lGsyd�Ľ�]����3"�?|¤�7א�6 �P`���`�dӐ|k�rCW�|bS�8�rz��hb�	���;�uGsł7ke�T%��8����0��2aj�i��8�Syّ�&3��!��~����He?�|���j�cj#N�����0��]��������zy���j�a�6V�au-��	θPUhf��}u��̉ݑ��ì�3���{y�0w�bw�jqۼ���z��3���m"�,�0�A(�n�=b�z�׭���6m�����I�G�>�M]�yXJq�������f4��������SW���2z��8��SH:$$�=om���#.�a�����d�m�����yZ�>��w� ����B%�����V	��������p(p (~r�ҿ>1̲�+p�#���S���q���l4OP��ݸ��_��K�Ք��_�p��q�㐿�)�:Ԏ[��9-��D�'���9N��u�z�\�Ѿ���h7\��k��\`���]R��~p���]$��^p��;8�H���
D2��;ȟ��B���p�q넍��Q����8��8Ȼ�� I�e��q����g�(Ϛ�z����3�y�d�o����m|�����f$"��/]s�_���b�l;nxއ�8��63���s��u�?x*t%!����53�������t��4�	=C��Gm�\��u�b�Q�o��|�)?A�n����?�s}�)?��\����4�g=�]�؍�*t��y:_�?aqa%�C���s��_&�Y�^�uiz�� ��]�dz�s��^c�CC�@�C�O��+���p���Byg��&�9_p�J���,�s��Ďs��_U�g�8�"��B|A�)v��q�:�ZQ���Ap��s��_�^5���>�on|9ȟ́u�bq��v���	f`th�z�:b�K;�����@�f�w���E�/(v��titQ�	E�F����d�$� ��jdj<'K�ɂ���@��r����d�eGa�����di9Y`�q(,��>�貓��I�Csa�5�����$��D�uLU��@��d�9Y��0@C�Ȳ�7ۃu��ȃ�Ğ��+zǁ�^�����-'���DsD/j0���G�9]4�&��P���tќ�h�L.|��cq��='Y�C��u�=98,�,�N����4���d�t�ݦ��I�i��.� �������z�u�����Q���e��8��7"�}Ie�漌P��Yd�Q&��S�}�BOi:яN��$/w���!�=Ѕ��o�Հ��b� ��p�����9=�����G�����U�Hd��wnaw~�rp�;ۛX%���z�r�N�5��Ƅzш��U��H\��[�-���"�.�D0�<�I�W�T�2r%{^C<ݪ� }�7��b�:������ٛ {����s��$ ˴�+
穞�u�Η����ҭ��9���fl��ђ ��|�|�N`Q�����x�������b&GZ%�����,*lW��_8��O��B����<�������w?��×�o~y��9�퍆ECQ ���k@{��#�?�x������s���A%tځ����ͷ�.P��+�����h���T��u���:��B��Q��*�}�K3�mP�x� �.ح	�?��P��89�h��P�T%�9��y+�>�қ�y�u�p�ϩl�}�po0R[��WgL��_��bo8�����Q�
�
�����K�PQħ�^^rZ�c[��_y�N�7��?�����p���|��������b�kwa�"��=�������~=?~������ï�_�n����kmo�k�7O���������a���1��A5����%��O���cy����/O�ow��-C�1�A�P�g^�M��o��z���r���G,r�=0�l߹�w�cF8l�$��Yq�SC;m�6�A۰Ak�Y��G����:���t����l���K����>xnv���M��rq��������~���j�{���3
.u��|�.��1��������%S7?�=�۫��n�y�������b{��(�'d���:K���������(*��,���q�y��ݻ�dMx      ;   b   x�3�tIMK,�)�4�L�,���2�(��JM.Q�L��/JMQp��I-+H�4�2�k1�i1�I-���8��L�*�a*,8K�*��J�j�ajb���� $�      =   w   x�3�4�t�,�(M��())(���Os���s���S]R�3��<Ks29��8�8�R�Uo�i��X��Z������J�>}�����Ԝ]�^]�^C.S�qpI'��s���� 0>S      >      x�E�A
�0����)z��Z�B]��ܸI��iG���-8nރ�ߠ�r.!ʽ����9���]=ٿ��2�DUO$�������2�,7�Y�C�������Rb�z�GQ���Û\�B���1��#=�      A   �  x��\�n�8�V���� �-��_Sc��v6�f�i23X�.�D�l(Q%)��b��1�r_a��b{)YR�ib;��'@��yy�i�;��;�B��*F�yt�����0E2˘1��ꙁgD1A�QBIe�2#Ī�$R�~�2c�{;�(�r�%��^>�~0���n腞_��ɓ}�%����t���x/h��<�u�t4e*���E�D6��@=h��<ٻ>-a��E/�������;��G��<W2��p;LS����1�؀�$�&1'<�L�Zb�L$�Dq�P�콒�e��*그��;*��N�?�1��&�z���LZMP׋�K��p*��xSˌ
�Z@�^ľW2�E�a��WL5���S�1�'��O�Z&����nm�@;�^+����{[ ��{ A���T_[���탭g�FF��4a�2���
�d�10��h�piU!%TaYLo���6�=�;b3�.a6��m"y�K�ڨ�`%]��+�)�BS���v�S���5QX�e;Ֆ�>,�t}�;Is���]�x��`t��Y2z�u��1����9���%�`�$��G^J0,��9�H� �r�aI�WO�56h�OO`�B��e(9R`<�H���L�%y[�hZ�du@cY����C�F�j�ͷ�I&����?:i�Ns��Z۠�jj��cT�FF�4���mk�D/�~�x�H	7����!%�\�gz/��4E�w��P�E�aM�s�T#��i�̌v��o��>2��efN7L).��	���	�χ�5d�[�����Y���ӆ�6�Is\Ǥ)����l6iϼ��w���ɤ��6��3�S
V���`!��K�|�"�\G�Բ���8G��A��U���	��ŵE� ��A@eS�?<L\�-H+30h7���W��̜�<�2E!���!��O�L� �"YAxKXi)L
�@נ��r�i�oE7Y��� ���1'�P�,�I�p�$��|�Z�@�0ͭ�ɶyoZ��U9����}��3c!A.�!W��2��@�
+�Y��@i��՘-���D��sM!^�fi;���1:|�b��4R�1U.�B�u�-�����P�����tIJߓ _�|�&���C�n��Y3B/�� �;ꑚ���,��T�2���������0� 
�� R�,yƑ0?�2�~(�
L�9F�9(o� ���`^PTo��_)Z���`
+�ܥ}��
����Ĉc7y�sX�Tq"7�:8���h���e�Y R-cA�^#�~�-&���E�82��V�C��.p�>I�ߩ�>FPTNӎ�<��V�w��wY��f��ٺ���U�+3Bi�o8�B���ֻ!ȀsZG��|>�A��]�?�ΏL��K*���w�"���,�C��Ts	У�)�c�=�U���\�Y���,D��;����+F�� J�2�����p���p�F���˿�����:�x��-�ݕ��P�4��\	��I!�Q��K��E�~���g�Q'���n��~��8p�h�N�"Y(�N�bzb⟾g���������q�Y���]�oo0g�/E=���2{�j�,+30Q��W�0�� ��Pgӕ�����.��~���-ǵ��p���m���[��b{{{��/t/�.���3���V�K��ڱd�q�y5W�RQ`"�
F�[gØ*�r����٦�Ϯ��9T�/��^]��+~s@֓Z[u�@�]�,��_��
�O?�`!ׅCCDR�v�H�3 x�*�^�O?�w,�W�P6��⭞�g_���Dz5a8�˧����:}��;�F|�$�	�E:O��2��廫�>%ą��������+$���No`��5c�7R�6��PEXo]ݽ4�cճ\�v�q�_�G�r˻o`jL�z����m����"cۑL{�y�,zE.$�u������gI�����ɺ�ͥ��q�2Blb��K��l��q��*h]�+�_��#cM�<z�����^�l)]��x͔�k�e$x��l�5D�́Z��]ٜ �lP�O�Ky�R����p�p9�~�y����?rz��+�%t�n]�V *7��R��g�P[�ssS�9�b�������#�Mm�c��YWG2g��)˺�����V���a ��M�,�5����p$x����	��������$_���jb
#��J�
<v�۰~����S���|�ȷtF�"�sC&���R�2���.b�,������'4bz��X�_����x���8���Ho Knp����0χ�[�[�����Eׂ��|ޟW�KQ��!�:������:�?�n�q]�,�ٳ��2����վF�P�{}�k4�����Z*D�u�}���y������>��`���?J?��y3N}ǌ����7�k{I����z�}<�n������x��m����6q0}�����)$ou�Op�O�͇�$���X��.Ԍ]!����t7'ka�5���oQ�������lGi	���X��aW�U�Cœqho{���, Z�����-���9PK3�P+-�Xv��a�pNĩ9�l95�e �GG\��S�Z��-��"ѿ����M��!��ÐYđ�����j�e���)S�¿�:K��|"�L�1��T���A> �C������^[ƈ��S��,�����tl{Pc!ȋ,ȑU��h�[%�1b��6�u��ֱ����ޏ<f�S!���[ �0���hʙ.q�ضA�r��2a�3�c�K̡�%��tn��,z{����m�����̋�a����8J-��P�$y!4�p�^M�g���KI:?d\G����n�@��Fg52Dd��)6���F(%��B���jVAc�9�~#��t�!� �o
U��,�ӱn`ʃ	�!�-�EH������O��;�y����R�b�eTXe���M��p�0�J�Ut�]�މ.�vf�~g�gn��,L1fs�MÝ��a�z}j[|8�6�Ts�s�Bh\�θP�b�)��)J������ۨ9h4� ��l��m,P��D4Z��ޖ��t�F��4�!u��<b>�z�>�`%���"C�F���#�5Ȩ5�#^�uy�,��:o�I)�*6y�:[gy�֝�s8�¹����7�]��]�b��v�y��$��y 0~I20�0�󏱠���s�*t�C�wb�v�7c���+/����|���ga�`h+(3g*sKI��W㼉kc%��?��6��&Hw�cۮ(�!��<���mƅ]�[��t^���%	��Y(0x�152�;k���<�i��n�����{��r�m��I���+��W.S�w���
�e���u�@���U�Q1+=�f1��w�:maXU���u@���H�v#Ub�&۝ɉ�U3m��[mb�d�]���5D�oJ z�+^����-r�%�\��]~8!G3����!ߛ��pa�{�@Ch:������E�f�m;����x�ޏ9�YT]���=h�f5�u�H���=����N!X<Z��n�c���q2��GL�"=k/q���0����ٖ5?+�S���]�P\6�����	[��zPH`O"�]3��;�Mٔ�z\	3��.{��"��7)����Om�j��-�0�(���R>o��Hm��j�m3 |����H��z	�n��J(�.��f����b�IX]�M"pY��;�R�P�q��!�pٜP>�Ԧ�W�w�̞8�����*����o�P�[�^\74(�x��)�Hc�z�#aQ���{}=�+(�\���B_x�9$����ɓ��Oޮ      B     x�U��N1�k�)�L��ߞ ��B"�b��J���;P����Ξ��Yg�坓u��Y�:d���nͲH͠��=^YYwkVE=q �na6&�'��	^�Q1�>�J�n�cSD_�p�Y�mѺ��ZJ^�K���&����R��1�"<J��b���9�@ע����
�M�՘�I��[��;�C�DQ �OA_&�a�����2(��o>LAJ"�$P�¬�����m��#��-(_(C���2�L����\�Y���as�zc���.�      D   ;   x�3�t+��+Qp�K�4�2�tJLΆrL8���.Sΐ|��|Nc.3ӈ+F��� ��      F   ^   x��;
�@�:9E�]1�
����&��A@O��3����p�n7���:6AcP%��}j��-gvN���̒ᶮ�����<V����a      H      x������ � �      J   =   x�3�tITpK,J�2���S.��)-(��2�R�2�3��R�L8CR�r3�K�b���� Ԭy      L   K   x�3�t+��+q�K�2�tJL���9]R�3��L8��2sJ
�L9}�JKR�2��R��8C2��SK�b���� �      N      x�-��C1Ϧ���~���_G����#52�Q���h�۱���$s(� �\d�ʇ
[M�.m�}�1<Hp�����P4�p����Pϛ��+͍f�8�8�I�	]�E�C�������e�#�      P   |   x�-���0�V17����_�i�<D 7������t�7Fڪ���j����z�p�k�͖�Rqh�d�¿��E\�*s��}AL�&E�1�G6x:(��0-Y��'�dq�%������!�      Q   2   x��� 0��pL%B$���w�t@�a]�����|
�N;��= �&@      R      x������ � �      U      x������ � �         �   x�M�;�0�z}�=R�� 
d$RҬ��ّ��c
$�iFO3٣�����"^y�1����l�V�K}�$�Z�k��(x)9j����;�'GJ+rQH�ސ��f�=ٱ]M����)���.��������h����cc�� 'K6         "  x�%�ArA�;�Iᑝ����jV1 ���שG���#�G
�H����H?�wF�tS�8S$�2�S|��n� 鉜7|Ğ�NLg�ұv�{ z`z`z�������-��U1�ޱ�*�����oĘ
�P�>������f��(n�q�$^JTĊOh;XD�Ha�ˆe�;]�o�o�o�/�7�����Y(�b���1ED���5����Y®�.��tQ7�^�ux�����`NpNpNpN0����V���>Cf(�Q�s�!��Y��O��f�k��h�'q���9���]q>      V   �  x�u�Ks�0��r�XY=,Y��Ib���L.���c�m^��5��Ng�E3����vEP;_:B~�E�O��r%z�K�掩��D�T�	�<*���W�T�<J����$IW<S�*��J���M���}��^Z�C��Ξe����d�!�QE=O�G=����T��u�^���!u�	�Т��@��EOQ���m�벲�c��[lt��Ee+�>uq�Q\�(��1�i�K��]�v<���dp�ã���v��g�{7$v\�C�V�ǩ>c� ��w�p%� ��{�̸K��0��"����х�2��N~;��	 ��2���?��c2���z�=�J?OÞ���<Kn��L��S�6��?�2��8�l�(��6���E�L'CwE�'��!#�3��-�"\|F�!���F��l֯&[�3�M�1A:�m��ufnڽ����A�?���溜�c0�H�:�rŅcԟ�cN�Gݓ�7��'��      W       x�3�4�2�42�2�42�2�42����� (%      Y   F   x�3�t,(H�KTp.JM,��L/JM��2���S.��)-(���/J�KO�2�I-���)+JM����� ��      [   �   x�u�Kn!@יS��*���6���%��i���w��J�Q5&�����yÑ!�'	�;���N��+���w��E�7;
�E��^�<KVq��)��1;Z�����"/���т\�\���ו�Ɇ U�- ��"V�ܱ!`i���G��0!k'{횒#�v�F��,�
�ZN�/��]�Ɩ���S��j�[C��o�6�J�LK{��_����i�����0� �6��      ]   z   x�3�t,H-*��2���Sp�/*��21KJR��L8�2��s�
L9�32K��f��yy�99�@As�t"� C���D��ȀD�
)�9
E�Y��%
��y��E\���
!�EU�\1z\\\ Wx,,     
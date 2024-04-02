export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      AvailableDateTime: {
        Row: {
          createdAt: string
          id: number
          reservationId: number | null
          startDateTime: string
          updatedAt: string
          userId: number
        }
        Insert: {
          createdAt: string
          id?: number
          reservationId?: number | null
          startDateTime: string
          updatedAt: string
          userId: number
        }
        Update: {
          createdAt?: string
          id?: number
          reservationId?: number | null
          startDateTime?: string
          updatedAt?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'AvailableDateTime_reservationId_fkey'
            columns: ['reservationId']
            isOneToOne: false
            referencedRelation: 'Reservation'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'AvailableDateTime_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'User'
            referencedColumns: ['id']
          },
        ]
      }
      Game: {
        Row: {
          createdAt: string
          description: string
          iconUrl: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt: string
          description: string
          iconUrl: string
          id?: number
          name: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string
          iconUrl?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Plan: {
        Row: {
          amount: number
          createdAt: string
          description: string
          gameId: number
          id: number
          name: string
          stripePaymentLinkId: string
          stripePriceId: string
          stripeProductId: string
          updatedAt: string
          userId: number
        }
        Insert: {
          amount: number
          createdAt: string
          description: string
          gameId: number
          id?: number
          name: string
          stripePaymentLinkId: string
          stripePriceId: string
          stripeProductId: string
          updatedAt: string
          userId: number
        }
        Update: {
          amount?: number
          createdAt?: string
          description?: string
          gameId?: number
          id?: number
          name?: string
          stripePaymentLinkId?: string
          stripePriceId?: string
          stripeProductId?: string
          updatedAt?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Plan_gameId_fkey'
            columns: ['gameId']
            isOneToOne: false
            referencedRelation: 'Game'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Plan_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'User'
            referencedColumns: ['id']
          },
        ]
      }
      Reservation: {
        Row: {
          createdAt: string
          endDateTime: string
          id: number
          isAvailable: boolean
          planId: string
          startDateTime: string
          streamerId: number
          updatedAt: string
          userId: number
        }
        Insert: {
          createdAt: string
          endDateTime: string
          id?: number
          isAvailable?: boolean
          planId: string
          startDateTime: string
          streamerId: number
          updatedAt: string
          userId: number
        }
        Update: {
          createdAt?: string
          endDateTime?: string
          id?: number
          isAvailable?: boolean
          planId?: string
          startDateTime?: string
          streamerId?: number
          updatedAt?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Reservation_streamerId_fkey'
            columns: ['streamerId']
            isOneToOne: false
            referencedRelation: 'User'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Reservation_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'User'
            referencedColumns: ['id']
          },
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string
          iconUrl: string
          id: number
          isAdmin: boolean
          isStreamer: boolean
          name: string
          profile: string
          stripeAccountId: string
          updatedAt: string
        }
        Insert: {
          createdAt: string
          email: string
          iconUrl: string
          id?: number
          isAdmin: boolean
          isStreamer: boolean
          name: string
          profile: string
          stripeAccountId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          email?: string
          iconUrl?: string
          id?: number
          isAdmin?: boolean
          isStreamer?: boolean
          name?: string
          profile?: string
          stripeAccountId?: string
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never

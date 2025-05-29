export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      businesses: {
        Row: {
          business_id: number
          city_id: number | null
          country_id: number | null
          created_at: string | null
          description: string | null
          latitude: number | null
          longitude: number | null
          name: string | null
          neighborhood_id: number | null
          state_id: number | null
          user_id: number | null
        }
        Insert: {
          business_id?: number
          city_id?: number | null
          country_id?: number | null
          created_at?: string | null
          description?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          neighborhood_id?: number | null
          state_id?: number | null
          user_id?: number | null
        }
        Update: {
          business_id?: number
          city_id?: number | null
          country_id?: number | null
          created_at?: string | null
          description?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          neighborhood_id?: number | null
          state_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_businesses_city"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "fk_businesses_country"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "fk_businesses_neighborhood"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["neighborhood_id"]
          },
          {
            foreignKeyName: "fk_businesses_state"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["state_id"]
          },
          {
            foreignKeyName: "fk_businesses_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      cities: {
        Row: {
          city_id: number
          name: string | null
          state_id: number | null
        }
        Insert: {
          city_id?: number
          name?: string | null
          state_id?: number | null
        }
        Update: {
          city_id?: number
          name?: string | null
          state_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_cities_state"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["state_id"]
          },
        ]
      }
      comments: {
        Row: {
          comment: string | null
          comment_id: number
          created_at: string | null
          post_id: number | null
          user_id: number | null
        }
        Insert: {
          comment?: string | null
          comment_id?: number
          created_at?: string | null
          post_id?: number | null
          user_id?: number | null
        }
        Update: {
          comment?: string | null
          comment_id?: number
          created_at?: string | null
          post_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_comments_post"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "fk_comments_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      connections: {
        Row: {
          connected_user_id: number | null
          connection_id: number
          created_at: string | null
          status: string | null
          user_id: number | null
        }
        Insert: {
          connected_user_id?: number | null
          connection_id?: number
          created_at?: string | null
          status?: string | null
          user_id?: number | null
        }
        Update: {
          connected_user_id?: number | null
          connection_id?: number
          created_at?: string | null
          status?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_connections_connected_user"
            columns: ["connected_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_connections_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      countries: {
        Row: {
          country_id: number
          name: string | null
        }
        Insert: {
          country_id?: number
          name?: string | null
        }
        Update: {
          country_id?: number
          name?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string | null
          like_id: number
          post_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          like_id?: number
          post_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          like_id?: number
          post_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_likes_post"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "fk_likes_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string | null
          message_id: number
          read_status: boolean | null
          receiver_id: number | null
          sender_id: number | null
          sent_at: string | null
        }
        Insert: {
          content?: string | null
          message_id?: number
          read_status?: boolean | null
          receiver_id?: number | null
          sender_id?: number | null
          sent_at?: string | null
        }
        Update: {
          content?: string | null
          message_id?: number
          read_status?: boolean | null
          receiver_id?: number | null
          sender_id?: number | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_messages_receiver"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_messages_sender"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      neighborhoods: {
        Row: {
          city_id: number | null
          name: string | null
          neighborhood_id: number
        }
        Insert: {
          city_id?: number | null
          name?: string | null
          neighborhood_id?: number
        }
        Update: {
          city_id?: number | null
          name?: string | null
          neighborhood_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_neighborhoods_city"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["city_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          is_read: boolean | null
          message: string | null
          notification_id: number
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          is_read?: boolean | null
          message?: string | null
          notification_id?: number
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          is_read?: boolean | null
          message?: string | null
          notification_id?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_notifications_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          currency: string | null
          paid_at: string | null
          payment_id: number
          payment_method: string | null
          payment_status: string | null
          subscription_id: number | null
          transaction_reference: string | null
          user_id: number | null
        }
        Insert: {
          amount: number
          currency?: string | null
          paid_at?: string | null
          payment_id?: number
          payment_method?: string | null
          payment_status?: string | null
          subscription_id?: number | null
          transaction_reference?: string | null
          user_id?: number | null
        }
        Update: {
          amount?: number
          currency?: string | null
          paid_at?: string | null
          payment_id?: number
          payment_method?: string | null
          payment_status?: string | null
          subscription_id?: number | null
          transaction_reference?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_payments_subscription"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["subscription_id"]
          },
          {
            foreignKeyName: "fk_payments_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      plan_features: {
        Row: {
          feature_id: number
          feature_name: string | null
          feature_value: string | null
          plan_id: number | null
        }
        Insert: {
          feature_id?: number
          feature_name?: string | null
          feature_value?: string | null
          plan_id?: number | null
        }
        Update: {
          feature_id?: number
          feature_name?: string | null
          feature_value?: string | null
          plan_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_plan_features_plan"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["plan_id"]
          },
        ]
      }
      plans: {
        Row: {
          billing_cycle: string | null
          created_at: string | null
          description: string | null
          is_active: boolean | null
          max_connections: number | null
          max_projects: number | null
          name: string
          plan_id: number
          price: number
          support_level: string | null
        }
        Insert: {
          billing_cycle?: string | null
          created_at?: string | null
          description?: string | null
          is_active?: boolean | null
          max_connections?: number | null
          max_projects?: number | null
          name: string
          plan_id?: number
          price: number
          support_level?: string | null
        }
        Update: {
          billing_cycle?: string | null
          created_at?: string | null
          description?: string | null
          is_active?: boolean | null
          max_connections?: number | null
          max_projects?: number | null
          name?: string
          plan_id?: number
          price?: number
          support_level?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string | null
          created_at: string | null
          post_id: number
          user_id: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          post_id?: number
          user_id?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          post_id?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_posts_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      product_categories: {
        Row: {
          business_id: number | null
          category_id: number
          name: string | null
        }
        Insert: {
          business_id?: number | null
          category_id?: number
          name?: string | null
        }
        Update: {
          business_id?: number | null
          category_id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_product_categories_business"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number | null
          created_at: string | null
          description: string | null
          discount: number | null
          name: string | null
          price: number | null
          product_id: number
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          discount?: number | null
          name?: string | null
          price?: number | null
          product_id?: number
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          discount?: number | null
          name?: string | null
          price?: number | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_products_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      professions: {
        Row: {
          city_id: number | null
          country_id: number | null
          created_at: string | null
          description: string | null
          latitude: number | null
          longitude: number | null
          neighborhood_id: number | null
          profession_id: number
          state_id: number | null
          title: string | null
          user_id: number | null
        }
        Insert: {
          city_id?: number | null
          country_id?: number | null
          created_at?: string | null
          description?: string | null
          latitude?: number | null
          longitude?: number | null
          neighborhood_id?: number | null
          profession_id?: number
          state_id?: number | null
          title?: string | null
          user_id?: number | null
        }
        Update: {
          city_id?: number | null
          country_id?: number | null
          created_at?: string | null
          description?: string | null
          latitude?: number | null
          longitude?: number | null
          neighborhood_id?: number | null
          profession_id?: number
          state_id?: number | null
          title?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_professions_city"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "fk_professions_country"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "fk_professions_neighborhood"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["neighborhood_id"]
          },
          {
            foreignKeyName: "fk_professions_state"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["state_id"]
          },
          {
            foreignKeyName: "fk_professions_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      saves: {
        Row: {
          created_at: string | null
          post_id: number | null
          save_id: number
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          post_id?: number | null
          save_id?: number
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          post_id?: number | null
          save_id?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_saves_post"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "fk_saves_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      states: {
        Row: {
          country_id: number | null
          name: string | null
          state_id: number
        }
        Insert: {
          country_id?: number | null
          name?: string | null
          state_id?: number
        }
        Update: {
          country_id?: number | null
          name?: string | null
          state_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_states_country"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          auto_renew: boolean | null
          created_at: string | null
          end_date: string
          grace_ends_at: string | null
          payment_method: string | null
          plan_id: number | null
          start_date: string
          status: string | null
          subscription_id: number
          trial_ends_at: string | null
          user_id: number | null
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date: string
          grace_ends_at?: string | null
          payment_method?: string | null
          plan_id?: number | null
          start_date: string
          status?: string | null
          subscription_id?: number
          trial_ends_at?: string | null
          user_id?: number | null
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date?: string
          grace_ends_at?: string | null
          payment_method?: string | null
          plan_id?: number | null
          start_date?: string
          status?: string | null
          subscription_id?: number
          trial_ends_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_subscriptions_plan"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["plan_id"]
          },
          {
            foreignKeyName: "fk_subscriptions_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_by_plan: boolean | null
          role_name: string | null
          user_id: number | null
        }
        Insert: {
          assigned_by_plan?: boolean | null
          role_name?: string | null
          user_id?: number | null
        }
        Update: {
          assigned_by_plan?: boolean | null
          role_name?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_roles_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          full_name: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          password_hash: string
          plan_id: number | null
          profile_picture: string | null
          user_id: number
          username: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          password_hash: string
          plan_id?: number | null
          profile_picture?: string | null
          user_id?: number
          username: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          password_hash?: string
          plan_id?: number | null
          profile_picture?: string | null
          user_id?: number
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_users_plan"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["plan_id"]
          },
        ]
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
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

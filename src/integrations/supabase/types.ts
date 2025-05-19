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
      business_categories: {
        Row: {
          count: number | null
          id: string
          name: string
        }
        Insert: {
          count?: number | null
          id?: string
          name: string
        }
        Update: {
          count?: number | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      business_category_map: {
        Row: {
          business_id: string
          category_id: string
        }
        Insert: {
          business_id: string
          category_id: string
        }
        Update: {
          business_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_category_map_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_category_map_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "business_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      business_types: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      businesses: {
        Row: {
          contact_info: Json | null
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          is_open: boolean | null
          name: string
          rating: number | null
          reviews: number | null
          service_hours: Json | null
          type_id: string | null
          updated_at: string | null
          user_id: string | null
          working_hours: Json | null
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          is_open?: boolean | null
          name: string
          rating?: number | null
          reviews?: number | null
          service_hours?: Json | null
          type_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          working_hours?: Json | null
        }
        Update: {
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          is_open?: boolean | null
          name?: string
          rating?: number | null
          reviews?: number | null
          service_hours?: Json | null
          type_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          working_hours?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "business_types"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_saves: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_saves_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          business_id: string | null
          comments: number | null
          content: string
          created_at: string | null
          id: string
          image: string | null
          likes: number | null
          likes_count: number | null
          professional_id: string | null
          saves_count: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          comments?: number | null
          content: string
          created_at?: string | null
          id?: string
          image?: string | null
          likes?: number | null
          likes_count?: number | null
          professional_id?: string | null
          saves_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          comments?: number | null
          content?: string
          created_at?: string | null
          id?: string
          image?: string | null
          likes?: number | null
          likes_count?: number | null
          professional_id?: string | null
          saves_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          business_id: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          business_id: string | null
          category: string | null
          category_id: string | null
          created_at: string | null
          description: string | null
          discount: number | null
          id: string
          image: string | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          category?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          discount?: number | null
          id?: string
          image?: string | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          category?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          discount?: number | null
          id?: string
          image?: string | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profession_types: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      professional_categories: {
        Row: {
          count: number | null
          id: string
          name: string
        }
        Insert: {
          count?: number | null
          id?: string
          name: string
        }
        Update: {
          count?: number | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      professional_category_map: {
        Row: {
          category_id: string
          professional_id: string
        }
        Insert: {
          category_id: string
          professional_id: string
        }
        Update: {
          category_id?: string
          professional_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "professional_category_map_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "professional_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professional_category_map_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professionals: {
        Row: {
          bio: string | null
          created_at: string | null
          id: string
          image: string | null
          likes: number | null
          messages: number | null
          name: string
          online: boolean | null
          rating: number | null
          reviews: number | null
          title: string
          type_id: string | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
          working_hours: Json | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          likes?: number | null
          messages?: number | null
          name: string
          online?: boolean | null
          rating?: number | null
          reviews?: number | null
          title: string
          type_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          working_hours?: Json | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          likes?: number | null
          messages?: number | null
          name?: string
          online?: boolean | null
          rating?: number | null
          reviews?: number | null
          title?: string
          type_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          working_hours?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "professionals_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "profession_types"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          location: Json | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          location?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      saved_items: {
        Row: {
          business_id: string | null
          created_at: string | null
          id: string
          product_id: string | null
          professional_id: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          professional_id?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          professional_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_items_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_items_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "business" | "professional" | "user"
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
    Enums: {
      app_role: ["admin", "business", "professional", "user"],
    },
  },
} as const
